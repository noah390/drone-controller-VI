import { EmotionAdvice, EmotionType } from '../types/emotion';

export const emotionAdviceDatabase: Record<EmotionType, EmotionAdvice[]> = {
  happy: [
    {
      title: "I love seeing you happy! 😊",
      description: "Your happiness is absolutely wonderful, and I want to help you make the most of this beautiful feeling. When we're happy, it's the perfect time to build positive habits and share that joy with others.",
      techniques: [
        "Take a moment to really savor this feeling - notice what brought you here",
        "Write down three specific things you're grateful for right now",
        "Share your joy with someone you care about - happiness is contagious!",
        "Do something creative or engaging that amplifies this positive energy"
      ],
      affirmation: "I deserve this happiness and I choose to embrace every moment of it."
    },
    {
      title: "Let's make this happiness last! ✨",
      description: "I'm so glad you're feeling good! Happiness is like a muscle - the more we exercise it, the stronger it gets. Let me help you build some habits that can keep this positive momentum going.",
      techniques: [
        "Start a happiness journal - even just one line about what made you smile today",
        "Practice mindful appreciation of small pleasures throughout your day",
        "Spend some time in nature or do something that connects you to the world",
        "Do something kind for someone else - it's amazing how giving joy creates more joy"
      ],
      affirmation: "My happiness comes from within and grows stronger when I share it with others."
    }
  ],
  sad: [
    {
      title: "I'm here with you through this 💙",
      description: "I can sense you're going through a tough time, and I want you to know that what you're feeling is completely valid. Sadness is one of our most human emotions, and it's okay to sit with it for a while. Let me help you navigate this gently.",
      techniques: [
        "Give yourself permission to feel this without judgment - you're not broken",
        "Try some slow, deep breathing - in for 4, hold for 4, out for 6",
        "Reach out to someone who cares about you, even if it's just to say hello",
        "Take a gentle walk, even if it's just around your room or outside for a few minutes"
      ],
      affirmation: "This feeling is temporary, and I am stronger and more resilient than I know."
    },
    {
      title: "Finding light in the darkness 🕯️",
      description: "I know everything might feel heavy right now, but I believe in your ability to get through this. Sometimes sadness is our heart's way of processing something important. Let's work together to find some gentle ways to care for yourself.",
      techniques: [
        "Write about what you're feeling - sometimes getting it out helps lighten the load",
        "Listen to music that matches your mood, then gradually shift to something more uplifting",
        "Do one small thing that usually brings you comfort - make tea, take a bath, call a friend",
        "Remind yourself of other difficult times you've overcome - you've done it before"
      ],
      affirmation: "I honor my emotions and trust in my natural ability to heal and grow."
    }
  ],
  angry: [
    {
      title: "Your anger is telling you something important 🔥",
      description: "I can feel the intensity of what you're experiencing, and I want you to know that anger isn't 'bad' - it's often our inner protector trying to tell us something valuable. Let's work together to understand what it's saying and channel it constructively.",
      techniques: [
        "Before you respond to anything, take 10 slow, deep breaths - give your brain time to catch up",
        "Get your body moving - do jumping jacks, go for a run, or punch a pillow",
        "Write down exactly what triggered this feeling - sometimes seeing it helps",
        "Ask yourself: 'What boundary was crossed?' or 'What do I need right now?'"
      ],
      affirmation: "I can feel my anger fully and express my needs clearly and respectfully."
    },
    {
      title: "Let's understand what's underneath 🎯",
      description: "Anger is often like an iceberg - what we see on the surface is just part of the story. Usually there's hurt, fear, or unmet needs underneath. I'm here to help you explore this safely and find ways to address what's really going on.",
      techniques: [
        "Identify what values or needs feel threatened right now",
        "Practice using 'I' statements: 'I feel...' instead of 'You always...'",
        "Take a timeout if you need it - there's wisdom in stepping away",
        "Think about what you really want to happen - what would resolution look like?"
      ],
      affirmation: "My anger is valid information, and I can use it to create positive change."
    }
  ],
  anxious: [
    {
      title: "I understand how overwhelming this feels 🤗",
      description: "Anxiety can feel so intense and scary, but I want you to know you're not alone in this. Your mind is trying to protect you, even though it might feel like it's working against you right now. Let's work together to calm that worried part of you.",
      techniques: [
        "Try the 5-4-3-2-1 technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
        "Practice box breathing: breathe in for 4, hold for 4, out for 4, hold for 4",
        "Challenge anxious thoughts by asking: 'Is this definitely true?' and 'What would I tell a friend?'",
        "Focus on what you can control right now - even if it's just your next breath"
      ],
      affirmation: "I am safe in this moment, and I have the strength to handle whatever comes my way."
    },
    {
      title: "Building your anxiety toolkit 🛠️",
      description: "I know anxiety can feel unpredictable, but there are so many tools we can build together to help you feel more prepared and confident. You're stronger than your anxiety, and with practice, you can learn to work with it instead of against it.",
      techniques: [
        "Set aside 15 minutes daily as 'worry time' - write down concerns, then let them go",
        "Practice progressive muscle relaxation - tense and release each muscle group",
        "Create a self-care routine that you can rely on when things get tough",
        "Break overwhelming tasks into tiny, manageable steps - one thing at a time"
      ],
      affirmation: "I have overcome challenges before, and I'm building the skills to handle anything."
    }
  ],
  excited: [
    {
      title: "Your energy is absolutely infectious! 🚀",
      description: "I love feeling your excitement! This kind of positive energy is such a gift - both to yourself and everyone around you. Let's make sure we channel this amazing enthusiasm in ways that serve you well.",
      techniques: [
        "Write down your goals and dreams while this energy is flowing - capture it!",
        "Share your excitement with people who will celebrate with you",
        "Channel this energy into taking action on something meaningful to you",
        "Practice staying grounded while excited - feel your feet on the floor, take deep breaths"
      ],
      affirmation: "My enthusiasm is a powerful force that I can use to create positive change in my life."
    }
  ],
  frustrated: [
    {
      title: "I can feel your frustration, and it makes sense 😤",
      description: "Frustration is such a relatable feeling - it usually means something important to you is being blocked or isn't working the way you need it to. Let's figure out what's in the way and find some new approaches together.",
      techniques: [
        "Take a step back and identify exactly what obstacle is causing this frustration",
        "Brainstorm at least three different ways you could approach this situation",
        "Take a complete break and come back with fresh eyes - sometimes distance helps",
        "Ask someone you trust for their perspective - they might see solutions you can't"
      ],
      affirmation: "Every obstacle I face is an opportunity to become more creative and resilient."
    }
  ],
  calm: [
    {
      title: "What a beautiful state to be in 🧘‍♀️",
      description: "I'm so glad you're feeling calm and centered. This peaceful energy is precious - it's like having a superpower in our busy world. Let's talk about how to protect and nurture this wonderful feeling.",
      techniques: [
        "Take a few minutes to practice mindfulness - really notice this calm feeling",
        "Engage in activities that maintain your peace - reading, gentle music, nature",
        "Set healthy boundaries to protect this calm energy from unnecessary stress",
        "Share your peaceful presence with others - calm is contagious too"
      ],
      affirmation: "I am a source of calm and peace, and I can return to this feeling whenever I need it."
    }
  ],
  overwhelmed: [
    {
      title: "Let's break this down together 🤝",
      description: "Feeling overwhelmed is so common, and it's completely understandable. When everything feels like 'too much,' our brain can get stuck trying to process it all at once. Let me help you sort through this and find a path forward, one step at a time.",
      techniques: [
        "Do a 'brain dump' - write down everything on your mind, then prioritize what's actually urgent",
        "Focus only on the very next step you need to take - not the whole mountain",
        "Look at your list and ask: 'What can I delegate, delay, or delete entirely?'",
        "Practice saying 'no' to new commitments until you feel more balanced"
      ],
      affirmation: "I can handle one thing at a time, and that is more than enough."
    }
  ],
  lonely: [
    {
      title: "You're not alone, even when it feels that way 💕",
      description: "Loneliness can feel so heavy and isolating, but I want you to know that feeling lonely doesn't mean you're unlovable or that you'll always feel this way. It's your heart's way of telling you that connection matters to you, which is actually beautiful.",
      techniques: [
        "Reach out to just one person - even a simple 'thinking of you' text counts",
        "Practice self-compassion - treat yourself like you would a dear friend",
        "Consider joining a group, class, or community activity where you might meet like-minded people",
        "Volunteer to help others - it's amazing how helping creates connection"
      ],
      affirmation: "I am worthy of love and connection, and it starts with how I treat myself."
    }
  ],
  grateful: [
    {
      title: "Gratitude is such a powerful energy! 🙏",
      description: "I love that you're feeling grateful - it's one of the most transformative emotions we can experience. Gratitude literally rewires our brain to notice more good things. Let's amplify this beautiful feeling you're having.",
      techniques: [
        "Start or continue a daily gratitude journal - even just one sentence counts",
        "Reach out and thank someone who has made a difference in your life",
        "Practice gratitude meditation - spend a few minutes just appreciating",
        "Notice small moments of beauty throughout your day - the way light hits a wall, a stranger's smile"
      ],
      affirmation: "Gratitude fills my heart and naturally attracts more blessings into my life."
    }
  ],
  confused: [
    {
      title: "Confusion is often the first step to clarity 🤔",
      description: "I know confusion can feel uncomfortable, but it's actually a sign that your mind is working on something important. Sometimes we need to sit in the 'not knowing' for a while before the answers become clear. Let's explore this together.",
      techniques: [
        "Make two lists: 'What I know for sure' and 'What I'm uncertain about'",
        "Talk through your thoughts with someone you trust - sometimes speaking helps clarify",
        "Break complex issues into smaller, more manageable pieces",
        "Give yourself permission to not have all the answers right now - clarity takes time"
      ],
      affirmation: "Clarity will come as I remain patient and open to understanding."
    }
  ],
  hopeful: [
    {
      title: "Hope is such a beautiful and powerful force! 🌟",
      description: "I'm so glad you're feeling hopeful - hope is like a light that guides us forward, even when we can't see the whole path. This feeling you're having is precious and worth nurturing. Let's talk about how to keep this hope alive and growing.",
      techniques: [
        "Spend some time visualizing your hopes and dreams - really see them in detail",
        "Take one small, concrete action toward something you're hoping for",
        "Surround yourself with positive influences - people, books, music that uplift you",
        "Remember other times when hope led to positive outcomes in your life"
      ],
      affirmation: "My hope is a guiding light that leads me toward a brighter, more fulfilling future."
    }
  ]
};

export function getRandomAdvice(emotion: EmotionType): EmotionAdvice {
  const adviceArray = emotionAdviceDatabase[emotion];
  const randomIndex = Math.floor(Math.random() * adviceArray.length);
  return adviceArray[randomIndex];
}

export function getIntensityBasedAdvice(emotion: EmotionType, intensity: number): EmotionAdvice {
  const adviceArray = emotionAdviceDatabase[emotion];
  
  // For high intensity emotions, provide more comprehensive advice
  if (intensity >= 8) {
    return adviceArray[0]; // First advice is usually more comprehensive
  } else if (intensity >= 5) {
    return adviceArray[Math.min(1, adviceArray.length - 1)];
  } else {
    return getRandomAdvice(emotion);
  }
}