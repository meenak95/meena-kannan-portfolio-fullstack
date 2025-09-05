import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "utils";
import { 
  ChevronRight, 
  Code, 
  Cloud, 
  Database, 
  Cpu, 
  Globe, 
  Award,
  ArrowRight,
  Download,
  Sparkles,
  Building2,
  Calendar,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Briefcase,
  User,
  Target,
  Heart,
  Lightbulb,
  Users,
  Server,
  Wrench,
  TestTube,
  TrendingUp,
  Linkedin,
  Star
} from "lucide-react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Badge } from "components/ui/badge";
import { Progress } from "components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { skillsData, projectsData } from "../components/skills/SkillsData";

const Counter = ({ to }: { to: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(to.replace("+", ""));
          if (start === end) return;
          
          let duration = 2000;
          let startTime: number | null = null;

          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    
    observer.observe(node);
    return () => {
      observer.unobserve(node);
      observer.disconnect();
    };
  }, [to]);

  return <span ref={ref}>{count}{to.includes('+') ? '+' : ''}</span>;
};

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 10;
    const y = (e.clientY - top - height / 2) / 10;
    ref.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) scale3d(1.03, 1.03, 1.03)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSkillCategory, setActiveSkillCategory] = useState("all");
  const [activeProjectCategory, setActiveProjectCategory] = useState("all");
  const heroRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const elementsToObserve = [heroRef.current, skillsRef.current, projectsRef.current].filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    elementsToObserve.forEach(el => el && observer.observe(el));

    return () => {
      elementsToObserve.forEach(el => el && observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const techStack = [
    { name: "Java", icon: <Code className="w-6 h-6" />, color: "bg-orange-500", particles: "orange" },
    { name: "Spring Boot", icon: <Cpu className="w-6 h-6" />, color: "bg-green-500", particles: "green" },
    { name: "Angular", icon: <Globe className="w-6 h-6" />, color: "bg-red-500", particles: "red" },
    { name: "AWS", icon: <Cloud className="w-6 h-6" />, color: "bg-yellow-500", particles: "yellow" },
    { name: "PostgreSQL", icon: <Database className="w-6 h-6" />, color: "bg-blue-500", particles: "blue" },
    { name: "Kubernetes", icon: <Server className="w-6 h-6" />, color: "bg-purple-500", particles: "purple" },
  ];

  const stats = [
    { number: "9+", label: "Years Experience", icon: <Award className="w-8 h-8" />, color: "text-blue-400" },
    { number: "15+", label: "Technologies", icon: <Code className="w-8 h-8" />, color: "text-green-400" },
    { number: "50+", label: "Projects", icon: <Globe className="w-8 h-8" />, color: "text-purple-400" },
    { number: "3", label: "Certifications", icon: <Award className="w-8 h-8" />, color: "text-cyan-400" },
  ];

  const categoryIcons = {
    programming: { icon: Code, color: "text-blue-400" },
    frontend: { icon: Globe, color: "text-green-400" },
    backend: { icon: Server, color: "text-purple-400" },
    cloud: { icon: Cloud, color: "text-cyan-400" },
    database: { icon: Database, color: "text-orange-400" },
    devops: { icon: Wrench, color: "text-red-400" },
    testing: { icon: TestTube, color: "text-pink-400" },
  };

  const filteredSkills = activeSkillCategory === "all" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeSkillCategory);

  const filteredProjects = activeProjectCategory === "all" 
    ? projectsData 
    : projectsData.filter(project => project.category === activeProjectCategory);

  const categoryColors = {
    government: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    fintech: "bg-green-500/20 text-green-400 border-green-500/30",
    ai: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    "real-estate": "bg-orange-500/20 text-orange-400 border-orange-500/30"
  };

  return (
    <div className="min-h-screen bg-slate-950 overflow-hidden">
      {/* Dynamic Background with Particle System */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Animated Gradients */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        
        {/* Interactive Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-radial from-blue-400/5 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        {/* Cloud Infrastructure Animation */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 2}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            >
              <Cloud className="w-8 h-8 text-slate-700" />
            </div>
          ))}
        </div>
      </div>

      {/* Floating Contact Button */}
      <Link
        to={createPageUrl("Contact")}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group animate-bounce"
      >
        <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
      </Link>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-16">
        <div className="max-w-7xl mx-auto text-center z-10">
          <div className="mb-12 opacity-0 translate-y-8 animate-fade-in-up">
            <Badge variant="secondary" className="mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-500/30 px-6 py-2 text-lg">
              <Sparkles className="w-5 h-5 mr-2 animate-spin" />
              Lead Software Engineer
            </Badge>
            
            <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Meena
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Kannan
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Architecting the future with 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold"> scalable solutions</span>, 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 font-bold"> cloud innovation</span>, and 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 font-bold"> technical excellence</span>.
            </p>
          </div>

          {/* Animated Tech Stack Orbit */}
          <div className="relative mb-16 h-96 w-96 mx-auto opacity-0 translate-y-8 animate-fade-in-up">
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="absolute flex items-center justify-center"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `translate(-50%, -50%) rotate(${index * 60}deg) translateY(-140px) rotate(-${index * 60}deg)`,
                  }}
                >
                  <div className={`group relative p-4 rounded-2xl ${tech.color}/20 border ${tech.color}/30 backdrop-blur-sm hover:scale-125 transition-all duration-500 cursor-pointer`}>
                    <div className={`p-2 rounded-xl ${tech.color}/30 group-hover:animate-spin`}>
                      {tech.icon}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800/90 px-3 py-1 rounded-full text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {tech.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Central Hub */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center opacity-0 translate-y-8 animate-fade-in-up">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-4 rounded-2xl text-xl group shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300">
              <Briefcase className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Explore My Work
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              className="border-2 border-slate-600 text-slate-300 hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-700 hover:text-white px-10 py-4 rounded-2xl text-xl group shadow-2xl transform hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b53a59450b409515631d30/bd0a6ee13_Meena_Kannan_Java_Agile_Cloud_DevSecOps.pdf', '_blank')}
            >
              <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Download Resume
            </Button>
          </div>
        </div>

        {/* Animated Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>
            </div>
            <ChevronRight className="w-6 h-6 text-slate-400 rotate-90 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900/50 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
              <TrendingUp className="w-4 h-4 mr-2" />
              Career Milestones
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent">
              At a Glance
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative bg-slate-800/30 border border-slate-700/50 rounded-2xl p-8 text-center transition-all duration-500 hover:bg-slate-800/50 opacity-0 translate-y-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`${stat.color} mb-6 flex justify-center group-hover:scale-125 transition-transform duration-300 ease-in-out`}>
                  {stat.icon}
                </div>
                <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300 ease-in-out">
                  <Counter to={stat.number} />
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section ref={skillsRef} className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-purple-500/20 text-purple-400 border-purple-500/30">
              <Code className="w-4 h-4 mr-2" />
              Technical Expertise
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Skills & Technologies
            </h2>
          </div>

          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveSkillCategory}>
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-2">
              <TabsTrigger value="all" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300">
                All
              </TabsTrigger>
              {Object.keys(categoryIcons).map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300 capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeSkillCategory} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSkills.map((skill, index) => (
                  <Card 
                    key={skill.id}
                    className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up group overflow-hidden relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6 relative z-10">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                          {skill.name}
                        </h3>
                        <Badge variant="outline" className="text-slate-300 border-slate-600 bg-slate-700/50">
                          {skill.years_experience}y
                        </Badge>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between text-sm text-slate-400 mb-3">
                          <span>Proficiency</span>
                          <span className="font-bold text-white">{skill.proficiency}%</span>
                        </div>
                        <div className="relative">
                          <Progress 
                            value={skill.proficiency} 
                            className="h-3 bg-slate-700/50 rounded-full overflow-hidden"
                          />
                        </div>
                      </div>
                      
                      {skill.description && (
                        <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                          {skill.description}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Projects Section */}
      <section ref={projectsRef} className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-slate-950 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
              <Briefcase className="w-4 h-4 mr-2" />
              Professional Projects
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black text-white mb-8 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Featured Work
            </h2>
          </div>

          <Tabs defaultValue="all" className="mb-12" onValueChange={setActiveProjectCategory}>
            <TabsList className="grid w-full grid-cols-5 bg-slate-800/30 border border-slate-700/50 backdrop-blur-xl rounded-2xl p-2">
              <TabsTrigger 
                value="all" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                All Projects
              </TabsTrigger>
              <TabsTrigger 
                value="government" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Government
              </TabsTrigger>
              <TabsTrigger 
                value="fintech" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-cyan-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                FinTech
              </TabsTrigger>
              <TabsTrigger 
                value="ai" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                AI/ML
              </TabsTrigger>
              <TabsTrigger 
                value="real-estate" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-600 data-[state=active]:text-white rounded-xl transition-all duration-300"
              >
                Real Estate
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeProjectCategory} className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <Card 
                    key={project.id}
                    className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 opacity-0 translate-y-8 animate-fade-in-up group overflow-hidden relative"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardHeader className="relative z-10">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <CardTitle className="text-2xl text-white group-hover:text-blue-400 transition-colors duration-300">
                            {project.title}
                          </CardTitle>
                          <div className="flex items-center space-x-4 text-slate-400">
                            <div className="flex items-center space-x-2">
                              <Building2 className="w-4 h-4" />
                              <span className="text-sm font-medium">{project.company}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">{project.duration}</span>
                            </div>
                          </div>
                        </div>
                        {project.category && (
                          <Badge variant="outline" className={`${categoryColors[project.category as keyof typeof categoryColors]} animate-pulse`}>
                            {project.category}
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="relative z-10">
                      <p className="text-slate-300 mb-6 leading-relaxed group-hover:text-white transition-colors duration-300">
                        {project.description}
                      </p>
                      
                      {project.highlights && (
                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <Target className="w-4 h-4 mr-2 text-green-400" />
                            Key Achievements:
                          </h4>
                          <ul className="space-y-2">
                            {project.highlights.slice(0, 3).map((highlight, idx) => (
                              <li key={idx} className="flex items-start space-x-3 text-sm text-slate-300 group-hover:text-white transition-colors duration-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                                <span>{highlight}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {project.technologies && (
                        <div>
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center">
                            <Code className="w-4 h-4 mr-2 text-blue-400" />
                            Technologies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 6).map((tech, techIndex) => (
                              <Badge 
                                key={tech} 
                                variant="secondary" 
                                className="bg-slate-700/50 text-slate-300 border-slate-600 hover:bg-slate-600/50 hover:text-white transition-all duration-300"
                                style={{ animationDelay: `${techIndex * 0.1}s` }}
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.technologies.length > 6 && (
                              <Badge variant="outline" className="text-slate-400 border-slate-600">
                                +{project.technologies.length - 6} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-slate-950 to-slate-900 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 bg-green-500/20 text-green-400 border-green-500/30">
            <MessageCircle className="w-4 h-4 mr-2" />
            Let's Connect
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Ready to Collaborate?
          </h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            I'm always interested in discussing new opportunities, innovative projects, 
            and ways we can create amazing solutions together.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, label: "Email", value: "meenakannan92@gmail.com", href: "mailto:meenakannan92@gmail.com" },
              { icon: Phone, label: "Phone", value: "+65 87373057", href: "tel:+6587373057" },
              { icon: MapPin, label: "Location", value: "Singapore", href: null }
            ].map((contact, index) => (
              <Card 
                key={index}
                className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-500 group opacity-0 translate-y-8 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="text-blue-400 mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    <contact.icon className="w-8 h-8" />
                  </div>
                  <p className="text-slate-400 text-sm mb-2">{contact.label}</p>
                  {contact.href ? (
                    <a 
                      href={contact.href}
                      className="text-white font-medium hover:text-blue-400 transition-colors duration-300"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <p className="text-white font-medium">{contact.value}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Link to={createPageUrl("Contact")}>
            <Button className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-12 py-4 rounded-2xl text-xl group shadow-2xl hover:shadow-green-500/25 transform hover:scale-105 transition-all duration-300">
              <Send className="w-6 h-6 mr-3 group-hover:animate-bounce" />
              Get In Touch
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-900/50 border-t border-slate-800/50 backdrop-blur-xl relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">MK</span>
                </div>
                <div>
                  <h3 className="text-white font-bold text-xl">Meena Kannan</h3>
                  <p className="text-slate-400 text-sm">Lead Software Engineer</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Building scalable solutions with passion and precision. 
                Let's create something amazing together.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Quick Links</h4>
              <div className="space-y-2">
                {[
                  { name: "About", url: "#about" },
                  { name: "Skills", url: "#skills" },
                  { name: "Projects", url: "#projects" },
                  { name: "Contact", url: createPageUrl("Contact") }
                ].map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    className="block text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/meenakannan-mk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-500/20 transition-all duration-300 group"
                >
                  <Linkedin className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="mailto:meenakannan92@gmail.com"
                  className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-green-400 hover:bg-green-500/20 transition-all duration-300 group"
                >
                  <Mail className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
                <a
                  href="tel:+6587373057"
                  className="w-12 h-12 bg-slate-800/50 rounded-xl flex items-center justify-center text-slate-400 hover:text-purple-400 hover:bg-purple-500/20 transition-all duration-300 group"
                >
                  <Phone className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/50 mt-8 pt-8 text-center">
            <p className="text-slate-400 text-sm">
              © 2024 Meena Kannan. Crafted with passion and precision.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(3rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }

        .animate-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}
