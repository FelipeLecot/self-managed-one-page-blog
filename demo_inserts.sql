-- Insert into Image
INSERT INTO Image (name, description, dateCreated) VALUES
('image1.jpg', 'Description for Image 1', NOW()),
('image2.jpg', 'Description for Image 2', NOW()),
('image3.jpg', 'Description for Image 3', NOW()),
('image4.jpg', 'Description for Image 4', NOW()),
('image5.jpg', 'Description for Image 5', NOW()),
('image6.jpg', 'Description for Image 6', NOW()),
('image7.jpg', 'Description for Image 7', NOW()),
('image8.jpg', 'Description for Image 8', NOW()),
('image9.jpg', 'Description for Image 9', NOW()),
('image10.jpg', 'Description for Image 10', NOW()),
('image11.jpg', 'Description for Image 11', NOW()),
('image12.jpg', 'Description for Image 12', NOW()),
('image13.jpg', 'Description for Image 13', NOW()),
('image14.jpg', 'Description for Image 14', NOW()),
('image15.jpg', 'Description for Image 15', NOW());

-- Insert into Block
INSERT INTO Block (slug, heading, content) VALUES
('block-1', 'SEO Optimized Heading 1', '<h1>SEO Optimized Heading 1</h1><p>This is SEO optimized content for Block 1. It contains <strong>relevant keywords</strong> and <em>rich content</em> to rank well in search engines.</p>'),
('block-2', 'SEO Optimized Heading 2', '<h1>SEO Optimized Heading 2</h1><p>This is SEO optimized content for Block 2. It contains <strong>relevant keywords</strong> and <em>rich content</em> to rank well in search engines.</p>'),
('block-3', 'SEO Optimized Heading 3', '<h1>SEO Optimized Heading 3</h1><p>This is SEO optimized content for Block 3. It contains <strong>relevant keywords</strong> and <em>rich content</em> to rank well in search engines.</p>'),
('block-4', 'SEO Optimized Heading 4', '<h1>SEO Optimized Heading 4</h1><p>This is SEO optimized content for Block 4. It contains <strong>relevant keywords</strong> and <em>rich content</em> to rank well in search engines.</p>'),
('block-5', 'SEO Optimized Heading 5', '<h1>SEO Optimized Heading 5</h1><p>This is SEO optimized content for Block 5. It contains <strong>relevant keywords</strong> and <em>rich content</em> to rank well in search engines.</p>');

-- Insert into Gallery (Random assignment)
INSERT INTO Gallery (imageId, blockId) VALUES
(1, 1), (2, 1), (3, 2), (4, 2), (5, 3), (6, 3),
(7, 4), (8, 4), (9, 5), (10, 5), (11, 1), (12, 2),
(13, 3), (14, 4), (15, 5);

-- Insert into Navigation
INSERT INTO Navigation (url, name) VALUES
('/home', 'Home'),
('/about', 'About'),
('/services', 'Services'),
('/contact', 'Contact'),
('/blog', 'Blog');


-- Insert into Files
INSERT INTO File (name, description, dateCreated) VALUES
('deslinde_desafio.pdf', 'Description for File 1', NOW())
('Planilla_Desafio.xlsx', 'Description for file 2', NOW())