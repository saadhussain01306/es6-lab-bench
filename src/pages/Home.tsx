import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/FeatureCard';
import { es6Features } from '@/data/es6Features';
import { Search, Code2, Sparkles } from 'lucide-react';

export default function Home() {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredFeatures = es6Features.filter(
    (feature) =>
      feature.title.toLowerCase().includes(search.toLowerCase()) ||
      feature.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border bg-gradient-to-b from-card to-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-primary/10 rounded-full">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Interactive Learning</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              ES6 Interactive Playground
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Master modern JavaScript with hands-on examples and live code execution
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/playground')}
                className="gap-2"
              >
                <Code2 className="h-5 w-5" />
                Open Playground
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  const firstFeature = es6Features[0];
                  navigate(`/feature/${firstFeature.id}`);
                }}
              >
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Features */}
      <main className="container mx-auto px-4 py-12">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search ES6 features..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFeatures.length > 0 ? (
            filteredFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No features found matching "{search}"</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>Happy learning ES6</p>
        </div>
      </footer>
    </div>
  );
}
