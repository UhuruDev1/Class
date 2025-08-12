-- Create comprehensive AI courses based on the provided resources
INSERT INTO courses (id, title, description, price, instructor_name, instructor_bio, image_url, category, difficulty_level, duration_hours, is_published, created_at) VALUES
(
  gen_random_uuid(),
  'LLM Fundamentals: From Theory to Practice',
  'Master the foundations of Large Language Models with Stanford CS229 content, covering architecture, training, and practical implementation. Learn from scratch how LLMs work and build your first language model.',
  499.99,
  'Dr. Sarah Chen',
  'Former Stanford AI researcher with 10+ years in NLP and machine learning. Published 50+ papers on language models.',
  '/placeholder.svg?height=400&width=600',
  'Fundamentals',
  'Beginner',
  40,
  true,
  now()
),
(
  gen_random_uuid(),
  'Building AI Agents: Complete Mastery',
  'Comprehensive course on building intelligent agents using ReAct, Chain-of-Thought, and Tree of Thoughts methodologies. Includes hands-on projects with real-world applications.',
  899.99,
  'Marcus Rodriguez',
  'Lead AI Engineer at top tech company. Expert in agentic AI systems and multi-agent architectures.',
  '/placeholder.svg?height=400&width=600',
  'Agents',
  'Intermediate',
  60,
  true,
  now()
),
(
  gen_random_uuid(),
  'RAG & Vector Databases Mastery',
  'Deep dive into Retrieval-Augmented Generation, vector embeddings, and building production-ready RAG applications. Includes Pinecone integration and evaluation techniques.',
  699.99,
  'Dr. Emily Watson',
  'Vector database architect and RAG systems expert. Built enterprise RAG solutions for Fortune 500 companies.',
  '/placeholder.svg?height=400&width=600',
  'RAG',
  'Intermediate',
  45,
  true,
  now()
),
(
  gen_random_uuid(),
  'Advanced Multi-Agent Systems',
  'Build sophisticated multi-agent systems with MCP, Anthropic Claude, and advanced coordination patterns. Master agent memory, communication, and collaborative problem-solving.',
  1299.99,
  'Prof. David Kim',
  'MIT professor specializing in multi-agent systems and distributed AI. Author of "Collaborative AI" textbook.',
  '/placeholder.svg?height=400&width=600',
  'Advanced',
  'Advanced',
  80,
  true,
  now()
),
(
  gen_random_uuid(),
  'LLMOps & Production AI Systems',
  'Learn to deploy, monitor, and scale AI systems in production. Covers evaluation, testing, and operational best practices for enterprise AI applications.',
  999.99,
  'Alex Thompson',
  'DevOps engineer turned AI infrastructure specialist. Built ML platforms serving millions of users.',
  '/placeholder.svg?height=400&width=600',
  'Operations',
  'Advanced',
  55,
  true,
  now()
),
(
  gen_random_uuid(),
  'AI Revolution Complete Package',
  'The ultimate AI mastery program combining all courses, private 1-on-1 mentoring, exclusive resources, and lifetime access to our AI community. Everything you need to become an AI expert.',
  2999.99,
  'AI Mastery Team',
  'Our complete team of AI experts, researchers, and industry professionals providing comprehensive mentorship.',
  '/placeholder.svg?height=400&width=600',
  'Complete',
  'All Levels',
  300,
  true,
  now()
);

-- Create lessons for each course with the provided resources
-- LLM Fundamentals Course Lessons
INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Introduction to Large Language Models',
  'Comprehensive overview of LLM architecture, training, and capabilities. Based on Stanford CS229 curriculum.',
  'https://lnkd.in/ernZFpvB',
  45,
  1,
  true,
  now()
FROM courses c WHERE c.title = 'LLM Fundamentals: From Theory to Practice';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'LLMs from Scratch - Stanford CS229',
  'Deep dive into building language models from the ground up with Stanford''s comprehensive curriculum.',
  'https://lnkd.in/etUh6_mn',
  90,
  2,
  false,
  now()
FROM courses c WHERE c.title = 'LLM Fundamentals: From Theory to Practice';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Prompt Engineering Mastery',
  'Advanced techniques for crafting effective prompts and understanding model behavior.',
  'https://lnkd.in/ewsbFwrP',
  60,
  3,
  false,
  now()
FROM courses c WHERE c.title = 'LLM Fundamentals: From Theory to Practice';

-- AI Agents Course Lessons
INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Agentic AI Overview',
  'Understanding the fundamentals of AI agents and their applications in modern systems.',
  'https://lnkd.in/ecpmzAyq',
  60,
  1,
  true,
  now()
FROM courses c WHERE c.title = 'Building AI Agents: Complete Mastery';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Building and Evaluating Agents',
  'Practical guide to constructing effective AI agents and measuring their performance.',
  'https://lnkd.in/e5KFeZGW',
  75,
  2,
  false,
  now()
FROM courses c WHERE c.title = 'Building AI Agents: Complete Mastery';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Building Effective Agents',
  'Advanced techniques for creating robust and reliable AI agents.',
  'https://lnkd.in/eqxvBg79',
  80,
  3,
  false,
  now()
FROM courses c WHERE c.title = 'Building AI Agents: Complete Mastery';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Building Agents with MCP',
  'Learn to build agents using Model Context Protocol for enhanced capabilities.',
  'https://lnkd.in/eZd2ym2K',
  85,
  4,
  false,
  now()
FROM courses c WHERE c.title = 'Building AI Agents: Complete Mastery';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Building an Agent from Scratch',
  'Complete walkthrough of creating a custom AI agent from the ground up.',
  'https://lnkd.in/eiZahJGn',
  95,
  5,
  false,
  now()
FROM courses c WHERE c.title = 'Building AI Agents: Complete Mastery';

-- RAG & Vector Databases Course Lessons
INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Building Vector DB with Pinecone',
  'Hands-on tutorial for creating and managing vector databases using Pinecone.',
  'https://lnkd.in/eP2tMGVs',
  65,
  1,
  true,
  now()
FROM courses c WHERE c.title = 'RAG & Vector Databases Mastery';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Vector DB from Embeddings to Apps',
  'Complete journey from understanding embeddings to building production applications.',
  'https://lnkd.in/eP2tMGVs',
  70,
  2,
  false,
  now()
FROM courses c WHERE c.title = 'RAG & Vector Databases Mastery';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Building and Evaluating RAG Apps',
  'Complete guide to building production-ready RAG applications with evaluation metrics.',
  'https://lnkd.in/ewy3sApa',
  90,
  3,
  false,
  now()
FROM courses c WHERE c.title = 'RAG & Vector Databases Mastery';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Agent Memory Systems',
  'Advanced techniques for implementing memory in AI agents for better context retention.',
  'https://lnkd.in/egC8h9_Z',
  75,
  4,
  false,
  now()
FROM courses c WHERE c.title = 'RAG & Vector Databases Mastery';

-- Advanced Multi-Agent Systems Course Lessons
INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Multi-Agent Systems Architecture',
  'Design patterns and architectures for building collaborative multi-agent systems.',
  'https://lnkd.in/evBnavk9',
  85,
  1,
  true,
  now()
FROM courses c WHERE c.title = 'Advanced Multi-Agent Systems';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Multi-Agent Use Cases',
  'Real-world applications and use cases for multi-agent systems in various industries.',
  'https://lnkd.in/e4f4HtkR',
  80,
  2,
  false,
  now()
FROM courses c WHERE c.title = 'Advanced Multi-Agent Systems';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'MCP with Anthropic',
  'Advanced Model Context Protocol implementation with Anthropic Claude.',
  'https://lnkd.in/eMEnkCPP',
  90,
  3,
  false,
  now()
FROM courses c WHERE c.title = 'Advanced Multi-Agent Systems';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Computer Use with Anthropic',
  'Learn to build agents that can interact with computer interfaces using Anthropic''s computer use capabilities.',
  'https://lnkd.in/ebHUc-ZU',
  95,
  4,
  false,
  now()
FROM courses c WHERE c.title = 'Advanced Multi-Agent Systems';

-- LLMOps & Production AI Systems Course Lessons
INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'LLMOps Best Practices',
  'Operational excellence for large language model deployment and monitoring.',
  'https://lnkd.in/ex4xnE8t',
  70,
  1,
  true,
  now()
FROM courses c WHERE c.title = 'LLMOps & Production AI Systems';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Evaluating AI Agents',
  'Comprehensive guide to testing and evaluating AI agent performance in production.',
  'https://lnkd.in/eBkTNTGW',
  85,
  2,
  false,
  now()
FROM courses c WHERE c.title = 'LLMOps & Production AI Systems';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Improving LLM Accuracy',
  'Advanced techniques for enhancing model performance and reducing hallucinations.',
  'https://lnkd.in/eVUXGT4M',
  80,
  3,
  false,
  now()
FROM courses c WHERE c.title = 'LLMOps & Production AI Systems';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Agent Design Patterns',
  'Proven design patterns for building scalable and maintainable AI agent systems.',
  'https://lnkd.in/euhUq3W9',
  75,
  4,
  false,
  now()
FROM courses c WHERE c.title = 'LLMOps & Production AI Systems';

-- Add research papers and additional resources as bonus content
INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'ReAct: Reasoning and Acting in Language Models',
  'Deep dive into the ReAct paper and its implications for agent reasoning.',
  'https://lnkd.in/eZ-Z-WFb',
  60,
  6,
  false,
  now()
FROM courses c WHERE c.title = 'Building AI Agents: Complete Mastery';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Chain-of-Thought Prompting',
  'Understanding and implementing chain-of-thought reasoning in language models.',
  'https://lnkd.in/eRCT_Xwq',
  55,
  4,
  false,
  now()
FROM courses c WHERE c.title = 'LLM Fundamentals: From Theory to Practice';

INSERT INTO lessons (id, course_id, title, description, video_url, duration_minutes, order_index, is_free, created_at)
SELECT 
  gen_random_uuid(),
  c.id,
  'Tree of Thoughts: Deliberate Problem Solving',
  'Advanced reasoning techniques using tree-structured thought processes.',
  'https://lnkd.in/eiadYm8S',
  65,
  7,
  false,
  now()
FROM courses c WHERE c.title = 'Building AI Agents: Complete Mastery';
