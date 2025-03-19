
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <Card className={cn("border shadow-sm mb-6 overflow-hidden", className)}>
      <CardHeader className="bg-secondary/30 p-4 pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-4 grid gap-4 md:grid-cols-2">
        {children}
      </CardContent>
    </Card>
  );
};

export default FormSection;
