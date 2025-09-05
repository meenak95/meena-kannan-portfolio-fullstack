import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle,
  Sparkles,
  Briefcase,
  Award
} from "lucide-react";
import { projectsData } from "../components/skills/SkillsData";

const categoryColors = {
  government: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  fintech: "bg-green-500/20 text-green-400 border-green-500/30",
  ai: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  "real-estate": "bg-orange-500/20 text-orange-400 border-orange-500/30"
};

export default function Experience() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

  const timeline = [
    {
      period: "Dec 2021 - Present",
      role: "Lead Software Engineer",
      company: "NCS, Singapore",
      location: "Singapore",
      current: true
    },
    {
      period: "May 2021 - Nov 2021",
      role: "Senior Software Engineer",
      company: "BlackStraw.AI",
      location: "India",
    },
    {
      period: "Aug 2019 - Dec 2020",
      role: "Software Engineer",
      company: "HDB (via AllTech Systems)",
      location: "Singapore",
    },
    {
      period: "Jul 2018 - Jul 2019",
      role: "Software Engineer",
      company: "Wolters Kluwer",
      location: "India",
    },
    {
      period: "May 2016 - Jul 2018",
      role: "Associate Software Engineer",
      company: "SysArc Infomatix",
      location: "India",
    }
  ];

  const ProjectCard = ({ project, index }: { project: typeof projectsData[0]; index: number }) => (
    <Card 
      className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105 opacity-0 translate-y-8 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl text-white">{project.title}</CardTitle>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-1">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{project.company}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{project.duration}</span>
              </div>
            </div>
          </div>
          {project.category && (
            <Badge variant="outline" className={categoryColors[project.category as keyof typeof categoryColors]}>
              {project.category}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-slate-300 mb-6 leading-relaxed">{project.description}</p>
        
        {project.highlights && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-white mb-3">Key Achievements:</h4>
            <ul className="space-y-2">
              {project.highlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start space-x-2 text-sm text-slate-300">
                  <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {project.technologies && (
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="bg-slate-700/50 text-slate-300 border-slate-600"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen py-20 px-6 bg-slate-950">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <Briefcase className="w-4 h-4 mr-2" />
            Professional Journey
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Experience & Projects
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A comprehensive look at my professional journey, key projects, and 
            the impact I've made across different industries and technologies.
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Career Timeline</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-center space-x-6">
                  <div className={`w-4 h-4 rounded-full border-2 ${item.current ? 'bg-blue-500 border-blue-500' : 'bg-slate-800 border-slate-600'} z-10`}></div>
                  <Card className="flex-1 bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{item.role}</h3>
                          <p className="text-blue-400 font-medium">{item.company}</p>
                          <div className="flex items-center space-x-4 mt-2 text-slate-400">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{item.period}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{item.location}</span>
                            </div>
                          </div>
                        </div>
                        {item.current && (
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 mt-2 md:mt-0">
                            Current Position
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
          
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory}>
            <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger 
                value="government" 
                className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
              >
                Government
              </TabsTrigger>
              <TabsTrigger 
                value="fintech" 
                className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
              >
                FinTech
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
              >
                AI/ML
              </TabsTrigger>
              <TabsTrigger 
                value="real-estate" 
                className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400"
              >
                Real Estate
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeCategory} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <ProjectCard key={project.id} project={project} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Certifications */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Award className="w-8 h-8 text-yellow-400 mr-3" />
              Professional Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Professional Scrum Product Owner™ I</h3>
                <p className="text-sm text-slate-400">Product Management & Strategy</p>
              </div>
              <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Professional Scrum Master™ I</h3>
                <p className="text-sm text-slate-400">Agile Leadership & Team Management</p>
              </div>
              <div className="text-center p-6 bg-slate-800/30 rounded-lg border border-slate-700">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">ICT Assessment Certification</h3>
                <p className="text-sm text-slate-400">NUS-ISS Singapore</p>
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
