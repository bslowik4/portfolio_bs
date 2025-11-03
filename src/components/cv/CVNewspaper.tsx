'use client';

import Image from 'next/image';

export default function CVNewspaper() {
  const personalInfo = {
    name: 'Bartłomiej Słowik',
    title: 'Full Stack Developer',
    email: 'bslowik4@gmail.com',
    phone: '+48 667 600 391',
    location: 'Kraków, Poland',
    github: 'github.com/bslowik4',
    site: 'portfolio-bs-pink.vercel.app/',
    photo: '/images/profile.png',
  };

  const employment = [
    {
      position: 'Self-employed - Full Stack Developer',
      company: 'Self-employed',
      location: 'Kraków, Poland',
      startDate: 'October 2024',
      endDate: 'Present',
      description: [
        'Worked on various client projects involving web development',
        'Collaborated with clients to gather requirements and deliver solutions',
        'Worked in small teams, ensuring effective communication',
        'I recommend checking my website to see some of my projects',
      ],
    },
    {
      position: 'Intership - Data Engineer',
      company: 'IBM',
      location: 'Kraków, Poland',
      startDate: 'October 2022',
      endDate: 'October 2022',
      description: [
        'Worked with python algorithms to process and analyze data',
        'Created comparasion between different libraries to enchance ML models',
        'Presented findings to the data science team',
      ],
    },
    {
      position: 'Frontend Developer',
      company: 'Krakweb',
      location: 'Kraków, Poland',
      startDate: 'Feb 2021',
      endDate: 'Feb 2021',
      description: [
        'Desinged and created modern e-commerce website',
        'Used company provided CMS to manage products and content',
        'Worked on documentation and project repository',
      ],
    },
  ];

  const favoriteSkills = [
    { name: 'Next.js', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'Express.js', level: 'Expert' },
    { name: 'SQL Databases', level: 'Advanced' },
    { name: 'AI Solutions', level: 'Advanced' },
    { name: 'Google Cloud', level: 'Beginner' },
  ];

  const languages = [
    { name: 'Polish', level: 'Native' },
    { name: 'English', level: 'C1' },
  ];

  const education = [
    {
      degree: 'IT Technician',
      institution: 'Technikum Łączności w Krakowie',
      location: 'Kraków, Poland',
      year: '2019-2024',
    },
    {
      degree: 'Psychology',
      institution: 'Jagiellonian University',
      location: 'Kraków, Poland',
      year: '2024-present',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white shadow-2xl overflow-hidden print:shadow-none">
          <div className="border-b-8 border-t-8 border-double border-gray-900 py-8 px-6 sm:px-12">
            <div className="text-center">
              <div className="text-xs font-bold text-gray-600 tracking-[0.3em] mb-2">
                CURRICULUM VITAE
              </div>
              <h1
                className="font-bold text-gray-900 mb-2"
                style={{
                  fontFamily: 'Times New Roman, Times, serif',
                  fontSize: 'clamp(2rem, 6vw, 4rem)',
                  letterSpacing: '0.05em',
                }}
              >
                {personalInfo.name.toUpperCase()}
              </h1>
              <div
                className="text-2xl text-gray-700 tracking-wide italic mb-3"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {personalInfo.title}
              </div>
              <div className="text-sm text-gray-600 tracking-wide">
                EST. 2025 • PROFESSIONAL EDITION
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-8 border-b-4 border-double border-gray-900">
              <div className="flex justify-center md:justify-start">
                <div className="relative w-48 h-48 border-4 border-gray-900 overflow-hidden">
                  <Image
                    src={personalInfo.photo}
                    alt={personalInfo.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-4">
                <div className="border-l-4 border-gray-900 pl-4">
                  <h2
                    className="text-2xl font-bold text-gray-900 uppercase mb-4"
                    style={{ fontFamily: 'Times New Roman, Times, serif' }}
                  >
                    Contact Details
                  </h2>
                  <div className="space-y-2 text-gray-700">
                    <div className="flex items-start">
                      <span className="font-bold mr-2 w-20">Email:</span>
                      <span style={{ fontFamily: 'Courier New, monospace' }}>
                        {personalInfo.email}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold mr-2 w-20">Phone:</span>
                      <span style={{ fontFamily: 'Courier New, monospace' }}>
                        {personalInfo.phone}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold mr-2 w-20">Location:</span>
                      <span>{personalInfo.location}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold mr-2 w-20">GitHub:</span>
                      <a
                        href={`https://${personalInfo.github}`}
                        style={{ fontFamily: 'Courier New, monospace' }}
                      >
                        {personalInfo.github}
                      </a>
                    </div>
                    <div className="flex items-start">
                      <span className="font-bold mr-2 w-20">Website:</span>
                      <a
                        href={`https://${personalInfo.site}`}
                        style={{ fontFamily: 'Courier New, monospace' }}
                      >
                        {personalInfo.site}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-gray-500">●</span>
                <h2
                  className="text-3xl font-bold text-gray-900 uppercase"
                  style={{ fontFamily: 'Times New Roman, Times, serif' }}
                >
                  Employment History
                </h2>
              </div>

              <div className="space-y-8">
                {employment.map((job, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-l-gray-900 pl-6 pb-4 border-dashed last:border-b-0"
                  >
                    <div className="mb-3">
                      <h3
                        className="text-2xl font-bold text-gray-900"
                        style={{ fontFamily: 'Times New Roman, Times, serif' }}
                      >
                        {job.position}
                      </h3>
                      <div className="text-lg text-gray-700 italic mt-1">
                        {job.company} • {job.location}
                      </div>
                      <div
                        className="text-sm font-bold text-gray-600 mt-1 tracking-wide"
                        style={{ fontFamily: 'Courier New, monospace' }}
                      >
                        {job.startDate} – {job.endDate}
                      </div>
                    </div>
                    <ul className="space-y-2 text-gray-700">
                      {job.description.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="flex-shrink-0 mt-1.5 leading-none">▪</span>
                          <span className="flex-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-gray-500">●</span>
                <h2
                  className="text-3xl font-bold text-gray-900 uppercase"
                  style={{ fontFamily: 'Times New Roman, Times, serif' }}
                >
                  Favorite Technologies
                </h2>
              </div>

              <div className="mb-4 text-gray-700">
                <span className="italic">
                  For more technologies I have experience with, visit{' '}
                  <a
                    href={`https://${personalInfo.site}/skills`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline font-bold hover:text-gray-900"
                    style={{ fontFamily: 'Courier New, monospace' }}
                  >
                    my portfolio site
                  </a>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {favoriteSkills.map((skill, index) => (
                  <div key={index} className="border-2 border-gray-900 p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span
                        className="text-lg font-bold text-gray-900"
                        style={{ fontFamily: 'Courier New, monospace' }}
                      >
                        {skill.name}
                      </span>
                      <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-gray-500">●</span>
                <h2
                  className="text-3xl font-bold text-gray-900 uppercase"
                  style={{ fontFamily: 'Times New Roman, Times, serif' }}
                >
                  Languages
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages.map((language, index) => (
                  <div key={index} className="border-2 border-gray-900 p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <span
                        className="text-lg font-bold text-gray-900"
                        style={{ fontFamily: 'Courier New, monospace' }}
                      >
                        {language.name}
                      </span>
                      <span className="text-sm font-bold text-gray-600 uppercase tracking-wider">
                        {language.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold text-gray-500">●</span>
                <h2
                  className="text-3xl font-bold text-gray-900 uppercase"
                  style={{ fontFamily: 'Times New Roman, Times, serif' }}
                >
                  Education
                </h2>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="border-l-4 border-gray-900 pl-6">
                    <h3
                      className="text-2xl font-bold text-gray-900"
                      style={{ fontFamily: 'Times New Roman, Times, serif' }}
                    >
                      {edu.degree}
                    </h3>
                    <div className="text-lg text-gray-700 italic mt-1">
                      {edu.institution} • {edu.location}
                    </div>
                    <div
                      className="text-sm font-bold text-gray-600 mt-1 tracking-wide"
                      style={{ fontFamily: 'Courier New, monospace' }}
                    >
                      {edu.year}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t-8 border-double border-gray-900 py-6 px-6 sm:px-12 text-center">
            <p className="text-sm text-gray-600 italic" style={{ fontFamily: 'Georgia, serif' }}>
              This document represents a professional summary of qualifications and experience.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            </div>
            <div className="mt-2 text-xs text-gray-500 tracking-widest">
              PRINTED{' '}
              {new Date()
                .toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
                .toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
