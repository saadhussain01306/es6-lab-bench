import { useEffect, useRef, useState } from 'react';
import { transform } from '@babel/standalone';

interface SandboxRunnerProps {
  code: string;
  onOutput: (message: string) => void;
  onComplete: () => void;
}

export function SandboxRunner({ code, onOutput, onComplete }: SandboxRunnerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (!code) return;

    const runCode = () => {
      try {
        // Transpile ES6+ to ES5 using Babel
        const result = transform(code, {
          presets: ['env'],
          filename: 'playground.js',
        });

        const transpiledCode = result.code || '';

        // Create sandbox HTML with console override
        const sandboxHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
            </head>
            <body>
              <script>
                // Override console methods to send messages to parent
                (function() {
                  const originalLog = console.log;
                  const originalError = console.error;
                  const originalWarn = console.warn;

                  console.log = function(...args) {
                    window.parent.postMessage({
                      type: 'console',
                      method: 'log',
                      args: args.map(arg => {
                        try {
                          return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg);
                        } catch (e) {
                          return String(arg);
                        }
                      })
                    }, '*');
                    originalLog.apply(console, args);
                  };

                  console.error = function(...args) {
                    window.parent.postMessage({
                      type: 'console',
                      method: 'error',
                      args: args.map(arg => String(arg))
                    }, '*');
                    originalError.apply(console, args);
                  };

                  console.warn = function(...args) {
                    window.parent.postMessage({
                      type: 'console',
                      method: 'warn',
                      args: args.map(arg => String(arg))
                    }, '*');
                    originalWarn.apply(console, args);
                  };

                  // Catch runtime errors
                  window.onerror = function(message, source, lineno, colno, error) {
                    window.parent.postMessage({
                      type: 'console',
                      method: 'error',
                      args: ['❌ ' + message + (error && error.stack ? '\\n' + error.stack : '')]
                    }, '*');
                    return true;
                  };

                  // Catch unhandled promise rejections
                  window.addEventListener('unhandledrejection', function(event) {
                    window.parent.postMessage({
                      type: 'console',
                      method: 'error',
                      args: ['❌ Unhandled Promise Rejection: ' + event.reason]
                    }, '*');
                  });
                })();

                // Run user code
                try {
                  ${transpiledCode}
                  window.parent.postMessage({ type: 'complete' }, '*');
                } catch (error) {
                  console.error('❌ ' + error.message + '\\n' + error.stack);
                  window.parent.postMessage({ type: 'complete' }, '*');
                }
              </script>
            </body>
          </html>
        `;

        // Reset iframe by incrementing key
        setKey(prev => prev + 1);

        // Write to iframe after a brief delay to ensure it's mounted
        setTimeout(() => {
          const iframe = iframeRef.current;
          if (iframe && iframe.contentWindow) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(sandboxHtml);
            iframe.contentWindow.document.close();
          }
        }, 50);
      } catch (error: any) {
        onOutput(`❌ Transpilation Error: ${error.message}`);
        onComplete();
      }
    };

    runCode();

    // Listen for messages from iframe
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'console') {
        const prefix = event.data.method === 'error' ? '❌ ' : 
                      event.data.method === 'warn' ? '⚠️ ' : '';
        event.data.args.forEach((arg: string) => {
          onOutput(prefix + arg);
        });
      } else if (event.data.type === 'complete') {
        onComplete();
      }
    };

    window.addEventListener('message', handleMessage);

    // Timeout after 5 seconds
    const timeout = setTimeout(() => {
      onOutput('⚠️ Execution timeout (5s)');
      onComplete();
      setKey(prev => prev + 1); // Reset iframe
    }, 5000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeout);
    };
  }, [code, onOutput, onComplete]);

  return (
    <iframe
      key={key}
      ref={iframeRef}
      sandbox="allow-scripts"
      className="hidden"
      title="Code Sandbox"
    />
  );
}
