import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Progress } from "components/ui/progress";
import { Badge } from "components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { 
  Code, 
  Globe, 
  Server, 
  Cloud, 
  Database, 
  Wrench, 
  TestTube,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { skillsData } from "../components/skills/SkillsData";

const categoryIcons = {
  programming: { icon: Code, color: "text-blue-400" },
  frontend: { icon: Globe, color: "text-green-400" },
  backend: { icon: Server, color: "text-purple-400" },
  cloud: { icon: Cloud, color: "text-cyan-400" },
  database: { icon: Database, color: "text-orange-400" },
  devops: { icon: Wrench, color: "text-red-400" },
  testing: { icon: TestTube, color: "text-pink-400" },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = activeCategory === "all" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skillsData>);

  const SkillCard = ({ skill, index }: { skill: typeof skillsData[0]; index: number }) => (
    <Card 
      className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
          <Badge variant="outline" className="text-slate-300 border-slate-600">
            {skill.years_experience}y
          </Badge>
        </div>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-slate-400 mb-2">
            <span>Proficiency</span>
            <span>{skill.proficiency}%</span>
          </div>
          <Progress 
            value={skill.proficiency} 
            className="h-2 bg-slate-700"
          />
        </div>
        {skill.description && (
          <p className="text-sm text-slate-400">{skill.description}</p>
        )}
      </CardContent>
    </Card>
  );

  const CategoryHeader = ({ category, skills }: { category: string; skills: typeof skillsData }) => {
    const IconComponent = categoryIcons[category as keyof typeof categoryIcons]?.icon || Code;
    const iconColor = categoryIcons[category as keyof typeof categoryIcons]?.color || "text-blue-400";
    
    return (
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className={`p-3 rounded-xl bg-slate-800/50 ${iconColor}`}>
            <IconComponent className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white capitalize">
              {category.replace('_', ' ')} Technologies
            </h2>
            <p className="text-slate-400">{skills.length} skills</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen py-20 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Sparkles className="w-4 h-4 mr-2" />
            Technical Expertise
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Skills & Technologies
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A comprehensive overview of my technical skills, proficiency levels, 
            and years of experience across different technology stacks.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              All
            </TabsTrigger>
            {Object.keys(categoryIcons).map((category) => (
              <TabsTrigger 
                key={category} 
                value={category}
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 capitalize"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="space-y-12">
              {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                <div key={category}>
                  <CategoryHeader category={category} skills={categorySkills} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categorySkills.map((skill, index) => (
                      <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {Object.keys(categoryIcons).map((category) => (
            <TabsContent key={category} value={category} className="mt-8">
              <CategoryHeader category={category} skills={groupedSkills[category] || []} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(groupedSkills[category] || []).map((skill, index) => (
                  <SkillCard key={skill.id} skill={skill} index={index} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Skills Summary */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-400 mr-3" />
              Professional Growth
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">9+</div>
                <div className="text-slate-400">Years of Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
                <div className="text-slate-400">Core Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">3</div>
                <div className="text-slate-400">Professional Certifications</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(2rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
