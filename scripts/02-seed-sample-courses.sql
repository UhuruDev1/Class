-- Insert sample instructor profile
INSERT INTO public.profiles (id, email, full_name, role) 
VALUES (
  '00000000-0000-0000-0000-000000000001',
  'instructor@aimastery.com',
  'Dr. Sarah Chen',
  'instructor'
) ON CONFLICT (id) DO NOTHING;

-- Insert sample courses
INSERT INTO public.courses (id, title, description, instructor_id, price, difficulty_level, category, is_published) VALUES
(
  '11111111-1111-1111-1111-111111111111',
  'Introduction to Machine Learning',
  'Learn the fundamentals of machine learning with hands-on projects. Perfect for beginners who want to understand AI concepts and build their first ML models.',
  '00000000-0000-0000-0000-000000000001',
  0,
  'beginner',
  'Machine Learning',
  true
),
(
  '22222222-2222-2222-2222-222222222222',
  'Deep Learning with Neural Networks',
  'Master deep learning techniques using modern frameworks. Build neural networks from scratch and understand advanced architectures like CNNs and RNNs.',
  '00000000-0000-0000-0000-000000000001',
  99.99,
  'intermediate',
  'Deep Learning',
  true
),
(
  '33333333-3333-3333-3333-333333333333',
  'Natural Language Processing Mastery',
  'Dive deep into NLP with transformers, BERT, and GPT models. Learn to build chatbots, sentiment analysis, and language translation systems.',
  '00000000-0000-0000-0000-000000000001',
  149.99,
  'advanced',
  'NLP',
  true
),
(
  '44444444-4444-4444-4444-444444444444',
  'Computer Vision Fundamentals',
  'Explore computer vision techniques for image recognition, object detection, and image generation. Work with OpenCV and modern deep learning frameworks.',
  '00000000-0000-0000-0000-000000000001',
  79.99,
  'intermediate',
  'Computer Vision',
  true
),
(
  '55555555-5555-5555-5555-555555555555',
  'AI Ethics and Responsible AI',
  'Understand the ethical implications of AI systems. Learn about bias, fairness, transparency, and how to build responsible AI applications.',
  '00000000-0000-0000-0000-000000000001',
  0,
  'beginner',
  'AI Ethics',
  true
);

-- Insert sample lessons for Introduction to Machine Learning
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_free) VALUES
('11111111-1111-1111-1111-111111111111', 'What is Machine Learning?', 'Introduction to ML concepts and applications', 1, 15, true),
('11111111-1111-1111-1111-111111111111', 'Types of Machine Learning', 'Supervised, unsupervised, and reinforcement learning', 2, 20, true),
('11111111-1111-1111-1111-111111111111', 'Setting Up Your Environment', 'Installing Python, Jupyter, and ML libraries', 3, 25, false),
('11111111-1111-1111-1111-111111111111', 'Your First ML Model', 'Building a simple linear regression model', 4, 30, false),
('11111111-1111-1111-1111-111111111111', 'Model Evaluation', 'Understanding accuracy, precision, and recall', 5, 25, false);

-- Insert sample lessons for Deep Learning
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_free) VALUES
('22222222-2222-2222-2222-222222222222', 'Neural Network Basics', 'Understanding neurons and layers', 1, 20, true),
('22222222-2222-2222-2222-222222222222', 'Backpropagation Algorithm', 'How neural networks learn', 2, 35, false),
('22222222-2222-2222-2222-222222222222', 'Convolutional Neural Networks', 'CNNs for image processing', 3, 40, false),
('22222222-2222-2222-2222-222222222222', 'Recurrent Neural Networks', 'RNNs for sequence data', 4, 35, false),
('22222222-2222-2222-2222-222222222222', 'Advanced Architectures', 'ResNet, LSTM, and Transformers', 5, 45, false);

-- Insert sample lessons for NLP
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_free) VALUES
('33333333-3333-3333-3333-333333333333', 'Text Preprocessing', 'Cleaning and preparing text data', 1, 25, true),
('33333333-3333-3333-3333-333333333333', 'Word Embeddings', 'Word2Vec, GloVe, and FastText', 2, 30, false),
('33333333-3333-3333-3333-333333333333', 'Transformer Architecture', 'Understanding attention mechanisms', 3, 40, false),
('33333333-3333-3333-3333-333333333333', 'BERT and GPT Models', 'Pre-trained language models', 4, 35, false),
('33333333-3333-3333-3333-333333333333', 'Building a Chatbot', 'End-to-end NLP application', 5, 50, false);

-- Insert sample lessons for Computer Vision
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_free) VALUES
('44444444-4444-4444-4444-444444444444', 'Image Processing Basics', 'Working with images in Python', 1, 20, true),
('44444444-4444-4444-4444-444444444444', 'Feature Detection', 'Edge detection and corner detection', 2, 25, false),
('44444444-4444-4444-4444-444444444444', 'Object Detection', 'YOLO and R-CNN algorithms', 3, 35, false),
('44444444-4444-4444-4444-444444444444', 'Image Classification', 'Building CNN classifiers', 4, 30, false),
('44444444-4444-4444-4444-444444444444', 'Generative Models', 'GANs for image generation', 5, 40, false);

-- Insert sample lessons for AI Ethics
INSERT INTO public.lessons (course_id, title, content, order_index, duration_minutes, is_free) VALUES
('55555555-5555-5555-5555-555555555555', 'Introduction to AI Ethics', 'Why ethics matter in AI', 1, 15, true),
('55555555-5555-5555-5555-555555555555', 'Bias in AI Systems', 'Understanding and detecting bias', 2, 20, true),
('55555555-5555-5555-5555-555555555555', 'Fairness and Transparency', 'Building fair AI systems', 3, 25, false),
('55555555-5555-5555-5555-555555555555', 'Privacy and Security', 'Protecting user data in AI', 4, 20, false),
('55555555-5555-5555-5555-555555555555', 'Responsible AI Framework', 'Implementing ethical AI practices', 5, 30, false);
