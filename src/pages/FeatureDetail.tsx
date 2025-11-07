import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { CodeEditor } from '@/components/CodeEditor';
import { OutputPanel } from '@/components/OutputPanel';
import { RunBar } from '@/components/RunBar';
import { SandboxRunner } from '@/components/SandboxRunner';
import { GoalChecklist } from '@/components/GoalChecklist';
import { getFeatureById } from '@/data/es6Features';
import { ArrowLeft, BookOpen, Code, Terminal, Lightbulb, HelpCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function FeatureDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [shouldRun, setShouldRun] = useState(false);
  const [selectedExample, setSelectedExample] = useState(0);

  const feature = id ? getFeatureById(id) : null;

  useEffect(() => {
    if (feature && feature.examples.length > 0) {
      setCode(feature.examples[selectedExample].code);
      setOutput([]);
    }
  }, [feature, selectedExample]);

  if (!feature) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Feature not found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  const handleRun = () => {
    setOutput([]);
    setIsRunning(true);
    setShouldRun(true);
  };

  const handleReset = () => {
    setCode(feature.examples[selectedExample].code);
    setOutput([]);
    setShouldRun(false);
  };

  const handleOutput = (message: string) => {
    setOutput((prev) => [...prev, message]);
  };

  const handleComplete = () => {
    setIsRunning(false);
    setShouldRun(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <span className="text-3xl">{feature.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold">{feature.title}</h1>
                  <p className="text-sm text-muted-foreground">{feature.summary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="learn" className="space-y-6">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="learn" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Learn
            </TabsTrigger>
            <TabsTrigger value="code" className="gap-2">
              <Code className="h-4 w-4" />
              Code
            </TabsTrigger>
            <TabsTrigger value="snippets" className="gap-2">
              <Lightbulb className="h-4 w-4" />
              Snippets
            </TabsTrigger>
            <TabsTrigger value="quiz" className="gap-2">
              <HelpCircle className="h-4 w-4" />
              Quiz
            </TabsTrigger>
          </TabsList>

          {/* Learn Tab */}
          <TabsContent value="learn" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {feature.description}
                </ReactMarkdown>
              </div>
            </Card>

            {feature.gotchas.length > 0 && (
              <Alert>
                <AlertDescription>
                  <h3 className="font-semibold mb-2">⚠️ Gotchas & Common Pitfalls:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {feature.gotchas.map((gotcha, i) => (
                      <li key={i} className="text-sm">{gotcha}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}

            <GoalChecklist goals={feature.goals} featureId={feature.id} />
          </TabsContent>

          {/* Code Tab */}
          <TabsContent value="code" className="space-y-4">
            {/* Example Selector */}
            <div className="flex gap-2 flex-wrap">
              {feature.examples.map((example, i) => (
                <Button
                  key={i}
                  variant={selectedExample === i ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedExample(i)}
                >
                  {example.title}
                </Button>
              ))}
            </div>

            {/* Editor & Output */}
            <div className="grid lg:grid-cols-2 gap-4 h-[600px]">
              <div className="flex flex-col border border-border rounded-lg overflow-hidden">
                <RunBar
                  onRun={handleRun}
                  onReset={handleReset}
                  code={code}
                  isRunning={isRunning}
                />
                <div className="flex-1 overflow-hidden">
                  <CodeEditor value={code} onChange={setCode} />
                </div>
              </div>

              <OutputPanel output={output} onClear={() => setOutput([])} />
            </div>

            {feature.examples[selectedExample].expected && (
              <Alert>
                <Terminal className="h-4 w-4" />
                <AlertDescription>
                  <strong>Expected Output:</strong>
                  <pre className="mt-2 text-sm font-mono bg-muted p-2 rounded">
                    {feature.examples[selectedExample].expected}
                  </pre>
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Snippets Tab */}
          <TabsContent value="snippets" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {feature.snippets.map((snippet, i) => (
                <Card key={i} className="p-4">
                  <h3 className="font-semibold mb-2">{snippet.title}</h3>
                  <pre className="text-sm bg-code-bg p-3 rounded border border-code-border overflow-x-auto">
                    <code>{snippet.code}</code>
                  </pre>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quiz Tab */}
          <TabsContent value="quiz" className="space-y-4">
            {feature.quiz.map((q, i) => (
              <Card key={i} className="p-6">
                <h3 className="font-semibold mb-4">{q.question}</h3>
                <div className="space-y-2 mb-4">
                  {q.options.map((option, j) => (
                    <div
                      key={j}
                      className={`p-3 rounded border cursor-pointer transition-colors ${
                        j === q.answerIndex
                          ? 'border-success bg-success/10'
                          : 'border-border hover:bg-muted'
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
                <Alert>
                  <AlertDescription>
                    <strong>Explanation:</strong> {q.explanation}
                  </AlertDescription>
                </Alert>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Sandbox Runner */}
      {shouldRun && (
        <SandboxRunner
          code={code}
          onOutput={handleOutput}
          onComplete={handleComplete}
        />
      )}
    </div>
  );
}
