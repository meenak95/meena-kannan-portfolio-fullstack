import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Award, 
  Target, 
  Heart, 
  Code, 
  Users, 
  Lightbulb,
  Download,
  Sparkles
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Technical Excellence",
      description: "Committed to writing clean, maintainable code and following industry best practices.",
      color: "text-blue-400"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Leadership",
      description: "Passionate about mentoring developers and fostering collaborative team environments.",
      color: "text-green-400"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Continuous Learning",
      description: "Always staying updated with latest technologies and industry trends.",
      color: "text-purple-400"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Business Impact",
      description: "Focus on delivering solutions that drive real business value and user satisfaction.",
      color: "text-cyan-400"
    }
  ];

  const achievements = [
    "Led modernization of Singapore's national vehicle licensing system",
    "Mentored 15+ junior developers across multiple projects",
    "Achieved 99.9% uptime for mission-critical government applications",
    "Reduced system processing time by 60% through optimization",
    "Implemented DevOps practices reducing deployment time by 75%"
  ];

  return (
    <div className="min-h-screen py-20 px-6 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-6 bg-blue-500/20 text-blue-400 border-blue-500/30">
            <User className="w-4 h-4 mr-2" />
            About Me
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Passionate About Technology
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            I'm a Lead Software Engineer with 9+ years of experience building scalable, 
            high-performance applications. Based in Singapore, I specialize in full-stack 
            development, cloud architecture, and Agile team leadership.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Professional Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-slate-300 leading-relaxed">
                <p>
                  My journey in software development began in 2016, and since then, I've had the privilege 
                  of working on diverse projects spanning government systems, fintech, AI/ML, and real estate 
                  platforms. Currently based in Singapore, I serve as a Lead Software Engineer at NCS, 
                  where I lead the development of mission-critical systems for government agencies.
                </p>
                <p>
                  What drives me most is the opportunity to solve complex technical challenges while 
                  mentoring the next generation of developers. I believe in building not just great software, 
                  but great teams that can deliver sustainable, scalable solutions.
                </p>
                <p>
                  My expertise spans the full technology stack - from designing microservices architectures 
                  with Spring Boot and deploying them on AWS, to crafting responsive user interfaces with 
                  Angular and React. I'm particularly passionate about cloud-native development and DevOps practices.
                </p>
              </CardContent>
            </Card>

            {/* Core Values */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-white">Core Values & Approach</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <div key={index} className="space-y-3">
                      <div className={`${value.color}`}>
                        {value.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-white">{value.title}</h3>
                      <p className="text-slate-400 text-sm">{value.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Facts */}
            <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-blue-400" />
                  Quick Facts
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-slate-400 text-sm">Experience</p>
                    <p className="text-white font-medium">9+ Years</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Location</p>
                    <p className="text-white font-medium">Singapore</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Specialization</p>
                    <p className="text-white font-medium">Full-Stack Development</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Current Role</p>
                    <p className="text-white font-medium">Lead Software Engineer</p>
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">Education</p>
                    <p className="text-white font-medium">B.E, Anna University</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <p className="text-white font-medium">Professional Scrum Product Owner™ I</p>
                  <p className="text-slate-400 text-sm">Product Strategy & Management</p>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-medium">Professional Scrum Master™ I</p>
                  <p className="text-slate-400 text-sm">Agile Leadership</p>
                </div>
                <div className="space-y-2">
                  <p className="text-white font-medium">ICT Assessment Certification</p>
                  <p className="text-slate-400 text-sm">NUS-ISS Singapore</p>
                </div>
              </CardContent>
            </Card>

            {/* Download Resume */}
            <Card className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border-green-500/30 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-4">Get My Resume</h3>
                <Button 
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  onClick={() => window.open('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68b53a59450b409515631d30/bd0a6ee13_Meena_Kannan_Java_Agile_Cloud_DevSecOps.pdf', '_blank')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Key Achievements */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm mb-16">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white flex items-center">
              <Target className="w-8 h-8 text-green-400 mr-3" />
              Key Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-slate-300">{achievement}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Personal Touch */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-4">Beyond the Code</h3>
            <p className="text-slate-300 max-w-3xl mx-auto leading-relaxed">
              When I'm not coding, I enjoy exploring Singapore's vibrant tech community, 
              contributing to open-source projects, and staying up-to-date with the latest 
              developments in cloud computing and AI. I believe in work-life balance and 
              the importance of continuous learning both professionally and personally.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
