-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

-------database for the users-------------
CREATE TABLE IF NOT EXISTS users (
	user_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    gender TEXT NOT NULL,
    birthday TEXT NOT NULL,
    password_hash TEXT NOT NULL,    
    password TEXT NOT NULL
);


-- Lessons have fk_topic_id that references Topics table --
CREATE TABLE IF NOT EXISTS topics (
	topic_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    topic_name TEXT NOT NULL
);

---database for the correct and wrong answers + their explanation--------
CREATE TABLE IF NOT EXISTS Answers(
    answer_id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
    correct_ans TEXT NOT NULL,
    correct_ans_explanation TEXT NOT NULL,
    correct_ans_2 TEXT DEFAULT NULL,
    correct_ans_2_explanation TEXT DEFAULT NULL,
    wrong_ans_1 TEXT DEFAULT NULL,
    wrong_ans_2 TEXT DEFAULT NULL,
    wrong_ans_3 TEXT DEFAULT NULL,
    general_wrong_ans_explanation TEXT DEFAULT NULL,
    wrong_ans_1_explanation TEXT DEFAULT NULL,
    wrong_ans_2_explanation TEXT DEFAULT NULL,
    wrong_ans_3_explanation TEXT DEFAULT NULL
);

--------databse for the questions----------------
CREATE TABLE IF NOT EXISTS Questions(
    question_id INTEGER UNIQUE NOT NULL PRIMARY KEY AUTOINCREMENT,
    topic TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    question_content TEXT NOT NULL,
    question_hint TEXT NOT NULL,
    question_type TEXT NOT NULL,
    answer_type TEXT DEFAULT NULL,
    content_type TEXT NOT NULL,
    answer_id INT,
    FOREIGN KEY(answer_id) REFERENCES Answers(answer_id)
);


----------------//---****----- Where the users are inserted at-------****-------//---------
INSERT INTO users (user_name, email, gender, birthday, password_hash, password)
VALUES
('Lois Lane', 'loislane@gmail.com', 'Female', '20-03-2000', 'hashed_password_here' ,'abc123'),
('John Doe', 'johndoe@gmail.com', 'Female', '21-04-1989', 'hashed_password_here' ,'def456'),
('Jane Doe', 'janedoe@gmail.com', 'Male', '09-03-2010', 'hashed_password_here','ghi789');

----------------//---****----- Where the math topics are inserted at -------****-------//---------
INSERT INTO topics (topic_name)
VALUES
('Set Theory'),
('Permutations'),
('Combinatorics'),
('Graph Theory'),
('Proofs'),
('Relations');

----------------//---****----- Where the questions and ans are inserted at -------****-------//---------
------//_______________________Where the MCQ questions are inserted at______________________//-------------
--||||||||||-----Easy questions----||||||||||--
----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('x is an element of A or x is an element of B', 'That''s how union works', 'x is an element of A and x is not an element of B', 'x is an element of A and x is an element of B', 'x is an element of B or x is an element of A, but x is not an element of both A and B','This is an assumption that we can''t prove with just that 1 statement.', 'This is what an intersect means, which is not the same meaning as a union', 'This is an assumption that we can''t prove with just that 1 statement.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Easy', 'Let A and B be two sets. What does it mean if we say that x is an element of A∪B', 'Union refers to the elements present in either sets', 'MCQ' , 'text-based question' ,1);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('{70, 50}', 'These are the only elements present in both sets A and B', '{90, 80}', '{60, 50}', '{20}','These are elements that are not present in any sets', 'These are elements present in A ∩ C instead', 'This is an element in just 1 set but not both');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Easy', 'MCQEasyQuestion1.png', 'This symbol ''∩'' refers to the elements present in both sets ' ,'MCQ' , 'image' ,2);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('1', '{∅} contains one element which is ∅', '0', '69', '2','You miscounted the number of elements present in the set.', 'You miscounted the number of elements present in the set.', 'You miscounted the number of elements present in the set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Easy', 'What is the cardinality of the {∅}?', 'Cardinality refers to the numbers elements present in the set', 'MCQ' , 'text-based question' ,3);

--||||||||||-----Normal questions----||||||||||--
----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('x is an element of A or x is an element of B', 'That''s how union works', 'x is an element of A and x is not an element of B', 'x is an element of A and x is an element of B', 'x is an element of B or x is an element of A, but x is not an element of both A and B','This is an assumption that we can''t prove with just that 1 statement.', 'This is what an intersect means, which is not the same meaning as a union', 'This is an assumption that we can''t prove with just that 1 statement.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Normal', 'Let A and B be two sets. What does it mean if we say that x is an element of A∪B', 'Union refers to the elements present in either sets', 'MCQ' , 'text-based question' ,4);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('{50}', 'These are the only elements present in the sets A, B and C', '{90, 80}', '{60, 50}', '{20}','These are elements that are not present in any sets', 'These are elements present in A ∩ C instead', 'This is an element in just 1 set but not all of them');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Normal', 'MCQNormalQuestion1.png', 'This symbol ''∩'' refers to the elements present in all of the involving sets' , 'MCQ' , 'image' ,5);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('5', 'A contains 5 element which are 1, 2, 3, 90, 89', '8', '9', '12','You miscounted the number of elements present in the set.', 'You miscounted the number of elements present in the set.', 'You miscounted the number of elements present in the set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Normal', 'What is the cardinality of the A= {1, 2, 3, 90, 89}?', 'Cardinality refers to the numbers elements present in the set', 'MCQ' , 'text-based question' , 6);


--||||||||||-----Hard questions----||||||||||--
----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('x is an element of A or x is an element of B', 'That''s how union works', 'x is an element of A and x is not an element of B', 'x is an element of A and x is an element of B', 'x is an element of B or x is an element of A, but x is not an element of both A and B','This is an assumption that we can''t prove with just that 1 statement.', 'This is what an intersect means, which is not the same meaning as a union', 'This is an assumption that we can''t prove with just that 1 statement.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Hard', 'Let A and B be two sets. What does it mean if we say that x is an element of A∪B', 'Union refers to the elements present in either sets', 'MCQ' , 'text-based question' ,7);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('{10, 60, 70, 50, 20, 40, 30}', 'These are the only elements present in the sets A, B and C', '{90, 80}', '{60, 50}', '{20}','These are elements that are not present in any sets', 'These are elements present in A ∩ C instead', 'This is an element in just 1 set but not all of them');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Hard', 'MCQDifficultQuestion1.png', 'The symbol ''∪'' is asking for elements present in at least one of the involving sets' , 'MCQ' , 'image' ,8);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation' ,'wrong_ans_1', 'wrong_ans_2', 'wrong_ans_3', 'wrong_ans_1_explanation', 'wrong_ans_2_explanation', 'wrong_ans_3_explanation') 
VALUES ('7', 'A contains 5 element which are 1, 2, 3, 90, 89, 19, 23', '8', '9', '12','You miscounted the number of elements present in the set.', 'You miscounted the number of elements present in the set.', 'You miscounted the number of elements present in the set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id') 
VALUES ('Set Theory', 'Hard', 'What is the cardinality of the A= {1, 2, 3, 90, 89, 19, 23}?', 'Cardinality refers to the numbers elements present in the set', 'MCQ' , 'text-based question' ,9);


------//--_______Where the True/false questions are inserted at______------//-------------
--||||||||||-----Easy questions----||||||||||--
----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{1}', 'This is an element that is present in the original set', '{1,2,4}', 'This is an elements that was present in the original set', '{f}', '{e}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Easy', 'Which of the following is a subset of {1,2,3,4}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question' ,10);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{1}', 'This is an element that is present in the original set', '{1 , 2}', 'This is an elements that was present in the original set', '{f}', '{e}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Easy', 'Which of the following is a subset of {1,2,3,4}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question' , 11);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{b}', 'This is an element that is present in the original set', '{d}', 'This is an elements that was present in the original set', '{f}', '{e}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Easy', 'Which of the following is a subset of {a, b,c,d}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question', 12);

--||||||||||-----Normal questions----||||||||||--
----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{c}', 'This is an element that is present in the original set', '{b, d}', 'These are elements that are present in the original set', '{a}', '{e}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Normal', 'Which of the following is a subset of {b,c,d}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question' ,13);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{b}', 'This is an element that is present in the original set', '{c, d}', 'These are elements that are present in the original set', '{a}', '{e}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Normal', 'Which of the following is a subset of {b,c,d}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question' ,14);


----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{c}', 'This is an element that is present in the original set', '{b, c, d, e}', 'These are elements that are present in the original set', '{a}', '{z}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Normal', 'Which of the following is a subset of {b,c,d,e}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question' ,15);

--||||||||||-----Hard questions----||||||||||--

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{c, d}', 'This is an element that is present in the original set', '{b, c ,d}', 'These are elements that are present in the original set', '{a}', '{e}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Hard', 'Which of the following is a subset of {b,c,d}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question' , 16);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{b,c}', 'These are elements that were present in the original set', '{b, c ,d}', 'These are elements that were present in the original set', '{m}', '{e}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Hard', 'Which of the following is a subset of {a,b,c,d}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question' , 17);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'correct_ans_2', 'correct_ans_2_explanation','wrong_ans_1', 'wrong_ans_2', 'wrong_ans_1_explanation','wrong_ans_2_explanation') 
VALUES ('{b}', 'This is an element that is present in the original set', '{b, c ,d}', 'These are elements that are present in the original set', '{a}', '{e}' , 'This was not present in the original set.', 'This was not present in the original set.');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Hard', 'Which of the following is a subset of {b,c,d}?', 'Subsets of {a, b} = {a}, {b} and {a, b}','True/False question', 'text-based question' , 18);

------//___________________Where the Free response questions are inserted at_________________//-------------
--||||||||||-----Easy questions----||||||||||--

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('False', 'S1 ∩ S2 = {1} hence, S1 and S2 are not disjoint.', 'Two sets are only disjoint if they share no elements in common');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Easy', 'If S1= {0,1} and S2={1,2} . S1 and S2 disjoint. True or False?', 'Find out what makes two sets disjoint' ,'Free response question','text-based question' , 19);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('{∅,{3}}', 'A & B only share a common element of {3} and the powerset function generates a ∅ symbol', 'Look up what a powerset function does');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Easy', 'Let A = {1, 3} and let B = {2, 3}. Find P(A ∩ B). Note that your answer should be in {} and without spacing', 'Here, the  "∩" symbol refers to the elements present in both sets and the powerset always consists of a null symbol.' ,'Free response question','text-based question' , 20);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('2', '|P(S)| = 2^|S| = 4 = 2^2. Hence |S|=2 ', 'Look up what the method for cardinality of a powerset');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Easy', 'Let S be a set. If ∣P(S)∣=4, then ∣S∣ is:', 'Lookup the formula for a powerset function' ,'Free response question','text-based question' , 21);

--||||||||||-----Normal questions----||||||||||--

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('True', 'S1 ∩ S2 = ∅ hence, S1 and S2 are disjoint.', 'Two sets are only disjoint if they share no elements in common');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Normal', 'If S1= {0,1} and S2={2,3} .Are S1 and S2 disjoint? Give your answer as "True" or "False" ', 'Find out what makes two sets disjoint' ,'Free response question','text-based question' , 22);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('{∅,{2}}', 'A & B only share a common element of {2} and the powerset function generates a ∅ symbol', 'Look up what a powerset function does');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Normal', 'Let A = {1, 2} and let B = {2, 3}. Find P(A ∩ B). Note that your answer should be in {} and without spacing', 'Here, the  "∩" symbol refers to the elements present in both sets and the powerset always consists of a null symbol.' ,'Free response question','text-based question' , 23);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('4', '|P(S)| = 2^|S| = 16 = 2^4. Hence |S|=4 ', 'Look up what the method for cardinality of a powerset');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Normal', 'Let S be a set. If ∣P(S)∣=16, then ∣S∣ is:', 'Lookup the formula for a powerset function' ,'Free response question','text-based question' , 24);


--||||||||||-----Hard questions----||||||||||--
----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('32', 'For calculating the cardinality of a power set, use 2^ number of elements in the set. In this case its 2^5 which is 32 elements ', 'You either used a wrong formula or miscalculated');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Hard', 'Given a set A of  5 elements, what is the cardinality of the power set of (A)?', 'Use the formula for calculating the cardinality of a power set' ,'Free response question','text-based question' , 25);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('5', 'Since |P(S)| =32, then |P(S)| = 2^5, based on the formula for cardinality of the power set, this imples that 2^5 = 2^∣S∣, hence ∣S∣=5. ', 'You either used a wrong formula or miscalculated');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Hard', 'Let S be a set. If |P(S)| =32 then what is ∣S∣? ', 'Use the formula for calculating the cardinality of a power set' ,'Free response question','text-based question' , 26);

----One question----
INSERT INTO Answers('correct_ans', 'correct_ans_explanation', 'general_wrong_ans_explanation') 
VALUES ('2048', 'Based on the formula for cardinality of the power set, we simply calculate 2^11 =2048 ', 'You either used a wrong formula or miscalculated');

INSERT INTO Questions ('topic', 'difficulty', 'question_content', 'question_hint', 'question_type', 'content_type' ,'answer_id')
VALUES ('Set Theory', 'Hard', 'Given a set A of  11  elements,  what is the number of elements in P(A)?? ', 'Use the formula for calculating the cardinality of a power set' ,'Free response question','text-based question' , 27);

-----Note for myself: run npm run clean-db-win first then run npm run build-db-win ------------

COMMIT;
