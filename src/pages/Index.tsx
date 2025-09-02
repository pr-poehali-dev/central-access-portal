import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Tool {
  name: string;
  description: string;
  url: string;
  icon: string;
}

const tools: Tool[] = [
  {
    name: "WorkHours",
    description: "Учет рабочего времени и управление задачами",
    url: "https://workhours.sc.com",
    icon: "Clock"
  },
  {
    name: "Vault",
    description: "Безопасное хранение корпоративных данных",
    url: "https://vault.sc.com",
    icon: "Shield"
  },
  {
    name: "Git Server",
    description: "Система контроля версий",
    url: "https://git.sc.com",
    icon: "GitBranch"
  },
  {
    name: "SOCS",
    description: "Работа над клиентами",
    url: "https://socs.sc.com",
    icon: "Users"
  },
  {
    name: "SOCS.AI",
    description: "ИИ для обработки и анализа документов",
    url: "https://ai.socs.sc.com",
    icon: "Bot"
  },
  {
    name: "Презентации",
    description: "Коллекция презентаций и материалов",
    url: "https://presentations.sc.com",
    icon: "Presentation"
  },
  {
    name: "Обучение",
    description: "Материалы для профессионального развития",
    url: "https://learning.sc.com",
    icon: "GraduationCap"
  },
  {
    name: "Первые шаги в WH",
    description: "Руководство по началу работы с системой",
    url: "https://guide.sc.com",
    icon: "BookOpen"
  },
  {
    name: "Продукты",
    description: "Информация о продуктах и услугах компании",
    url: "https://products.sc.com",
    icon: "Package"
  },
  {
    name: "СвязькомВики",
    description: "Корпоративная база знаний",
    url: "https://wiki.sc.com",
    icon: "Database"
  },
  {
    name: "Памятка рудника",
    description: "Правила и процедуры для рудников",
    url: "https://mining.sc.com",
    icon: "Pickaxe"
  }
];

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTools = tools.filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Central Circle */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="w-80 h-80 bg-primary rounded-full flex flex-col items-center justify-center shadow-2xl">
          <h1 className="text-white text-2xl font-bold mb-6 text-center leading-tight">
            На расстоянии<br />клика
          </h1>
          <div className="w-64">
            <Input
              placeholder="Поиск по ресурсам..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/90 border-0 rounded-full px-6 py-3 text-center placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Tool Cards Orbiting Around Center */}
      <div className="absolute inset-0 flex items-center justify-center">
        {filteredTools.map((tool, index) => {
          const totalTools = filteredTools.length;
          const angle = (index / totalTools) * 2 * Math.PI - Math.PI / 2;
          const radius = 420;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <Card
              key={tool.name}
              className="absolute w-72 bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer animate-fade-in"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: 'translate(-50%, -50%)',
                animationDelay: `${index * 0.1}s`
              }}
              onClick={() => window.open(tool.url, '_blank')}
            >
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={tool.icon as any} size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2 text-primary underline">
                  {tool.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {tool.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* No results message */}
      {filteredTools.length === 0 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-32 text-center text-gray-500">
          Ничего не найдено
        </div>
      )}
    </div>
  );
}