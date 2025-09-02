import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface LinkCategory {
  title: string;
  links: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
}

const categories: LinkCategory[] = [
  {
    title: "Продукты",
    links: [
      { name: "WORK HOURS", url: "https://workhours.sc.com", icon: "Clock" },
      { name: "SC.Vault", url: "https://vault.sc.com", icon: "Shield" },
      { name: "GitLab", url: "https://gitlab.sc.com", icon: "GitBranch" },
      { name: "SC.DOCS", url: "https://docs.sc.com", icon: "FileText" },
      { name: "DOCS.AI", url: "https://ai.docs.sc.com", icon: "Bot" },
    ]
  },
  {
    title: "Презентации",
    links: [
      { name: "Корпоративные шаблоны", url: "https://templates.sc.com", icon: "Presentation" },
      { name: "Мастер презентаций", url: "https://presenter.sc.com", icon: "Monitor" },
      { name: "Библиотека слайдов", url: "https://slides.sc.com", icon: "Images" },
    ]
  },
  {
    title: "Обучение",
    links: [
      { name: "LMS платформа", url: "https://learn.sc.com", icon: "GraduationCap" },
      { name: "Видеокурсы", url: "https://videos.sc.com", icon: "Play" },
      { name: "Тренинг центр", url: "https://training.sc.com", icon: "BookOpen" },
    ]
  },
  {
    title: "СвязькомВики",
    links: [
      { name: "База знаний", url: "https://wiki.sc.com", icon: "Database" },
      { name: "Документация API", url: "https://api-docs.sc.com", icon: "Code" },
      { name: "Техническая поддержка", url: "https://support.sc.com", icon: "Headphones" },
    ]
  }
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.map(category => ({
    ...category,
    links: category.links.filter(link =>
      link.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.links.length > 0);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(#2563eb 1px, transparent 1px), linear-gradient(90deg, #2563eb 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        {/* Header */}
        <header className="text-center mb-12 animate-fade-in">
          <div className="flex justify-end mb-4 space-x-4 text-sm text-muted-foreground">
            <button className="hover:text-primary transition-colors">Главная</button>
            <button className="hover:text-primary transition-colors">Развитие</button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center max-w-7xl mx-auto w-full">
          
          {/* Central Logo and Search */}
          <div className="text-center mb-16 animate-scale-in">
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
              На расстоянии клика
            </h1>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
                <Input
                  placeholder="Поиск инструментов..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 text-base bg-card/50 border-primary/20 focus:border-primary backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          {/* Category Grid - Orbital Layout */}
          <div className="relative w-full max-w-5xl">
            {filteredCategories.map((category, categoryIndex) => {
              // Calculate position in a circle around the center
              const angle = (categoryIndex / filteredCategories.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 300;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <div
                  key={category.title}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
                  style={{
                    left: `calc(50% + ${x}px)`,
                    top: `calc(50% + ${y}px)`,
                    animationDelay: `${categoryIndex * 0.2}s`
                  }}
                >
                  <Card className="w-72 bg-card/70 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 group hover:scale-105 hover:shadow-lg hover:shadow-primary/10">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold mb-4 text-center text-primary flex items-center justify-center gap-2">
                        <Icon name="Zap" size={20} className="text-yellow-400" />
                        {category.title}
                        <Icon name="Zap" size={20} className="text-yellow-400" />
                      </h3>
                      <div className="space-y-3">
                        {category.links.map((link, linkIndex) => (
                          <Button
                            key={linkIndex}
                            variant="ghost"
                            className="w-full justify-start h-auto p-3 text-left hover:bg-primary/10 group/link"
                            asChild
                          >
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                              <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-primary/20 group-hover/link:bg-primary/30 transition-colors">
                                  <Icon name={link.icon as any} size={16} className="text-primary" />
                                </div>
                                <span className="font-medium">{link.name}</span>
                              </div>
                            </a>
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Quick Actions - Bottom Center */}
          <div className="mt-20 flex gap-4 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <Icon name="Plus" size={16} className="mr-2" />
              Добавить инструмент
            </Button>
            <Button variant="outline" className="border-primary/20 hover:border-primary/40 px-6 py-3 rounded-lg backdrop-blur-sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Настройки
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <p>Корпоративный портал • Версия 2.0 • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}