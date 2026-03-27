import type { CandidateInput } from "../schemas/candidateInput.js";

export const strongCandidate: CandidateInput = {
  candidateId: "candidate-strong",
  name: "Amina S.",
  essay:
    "I want to study public policy because I have already seen how small administrative gaps affect families in my district. During high school I built a volunteer translation rota for parents who could not follow school meetings in Russian or English, and the project stayed active after I handed it over to a younger team. What motivates me is not the idea of leadership as a title, but the ability to remove friction for people who are left out of systems that should serve them. I am applying because I want structured training in policy design, data analysis, and stakeholder communication so I can scale the kind of practical problem solving I have started locally.",
  shortAnswers: [
    {
      question: "Describe a time you initiated a project.",
      answer:
        "I noticed that volunteer signups for our neighborhood tutoring club were stored in scattered chats, so I created a shared intake form, a scheduling sheet, and a weekly reminder process. Attendance became more stable, and we reduced missed sessions because substitutes were easier to coordinate.",
    },
    {
      question: "What is a setback that changed how you work?",
      answer:
        "I once planned a community event without checking whether families preferred weekday evenings or weekends. Attendance was poor. After that, I started validating assumptions with short surveys before making plans, even for small projects.",
    },
    {
      question: "How do you communicate in teams?",
      answer:
        "I try to make next steps explicit. After meetings, I summarize decisions, owners, and deadlines in writing because I have learned that clarity matters more than enthusiasm when a team is busy.",
    },
  ],
};

export const averageCandidate: CandidateInput = {
  candidateId: "candidate-average",
  name: "Daniel R.",
  essay:
    "I am applying because I want to grow into a role where I can contribute to projects with real impact. In school I have participated in several clubs and group assignments, and those experiences showed me that I enjoy working with people who care about building something useful. I am still figuring out my long-term direction, but I know I learn quickly when I am given responsibility and feedback. This program interests me because it seems demanding and practical, and I think it would push me to become more disciplined and intentional.",
  shortAnswers: [
    {
      question: "Describe a time you took initiative.",
      answer:
        "In a class project I volunteered to organize the final presentation deck when the team was running late. I collected everyone's slides, fixed the formatting, and made sure we had a clear speaking order before presenting.",
    },
    {
      question: "What kind of leader are you?",
      answer:
        "I am usually not the loudest person, but I help teams stay on track. I listen first, then try to keep the group focused on what still needs to be done.",
    },
  ],
};

export const weakGenericCandidate: CandidateInput = {
  candidateId: "candidate-weak-generic",
  name: "Chris T.",
  essay:
    "I want this opportunity because I always try my best and believe I can do great things. I am passionate about success, teamwork, and making a difference. I am a hardworking person who never gives up and always aims high.",
  shortAnswers: [
    {
      question: "Describe a time you led something.",
      answer:
        "I have often led by example and supported people around me. I think leadership means staying positive and helping the team succeed.",
    },
    {
      question: "Why should we select you?",
      answer:
        "I am motivated, determined, and ready to learn. If selected, I will bring energy, commitment, and a strong mindset.",
    },
  ],
};

export const candidateFixtures: CandidateInput[] = [
  strongCandidate,
  averageCandidate,
  weakGenericCandidate,
];
