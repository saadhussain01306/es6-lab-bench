import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { ES6Feature } from '@/data/es6Features';
import { ChevronRight } from 'lucide-react';

interface FeatureCardProps {
  feature: ES6Feature;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const navigate = useNavigate();

  return (
    <Card 
      className="cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] group"
      onClick={() => navigate(`/feature/${feature.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="text-4xl mb-2">{feature.icon}</div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
        <CardTitle className="text-xl group-hover:text-primary transition-colors">
          {feature.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {feature.summary}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">
            {feature.examples.length} Examples
          </Badge>
          <Badge variant="outline">
            {feature.goals.length} Goals
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
