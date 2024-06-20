import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

interface Submission {
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

app.use(cors());
app.use(bodyParser.json());

app.get('/ping', (req: Request, res: Response) => {
    res.json(true);
});

app.post('/submit', (req: Request, res: Response) => {
    const { name, email, phone, github_link, stopwatch_time }: Submission = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const submission: Submission = { name, email, phone, github_link, stopwatch_time };

    try {
        let submissions: Submission[] = [];
        if (fs.existsSync(DB_FILE)) {
            const data = fs.readFileSync(DB_FILE, 'utf-8');
            submissions = JSON.parse(data);
        }

        submissions.push(submission);
        fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
        res.json({ message: 'Submission successful.' });
    } catch (err) {
        console.error('Error writing to database:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

app.get('/read_all', (req: Request, res: Response) => {
    try {
        if (!fs.existsSync(DB_FILE)) {
            return res.status(404).json({ error: 'No submissions found.' });
        }

        const data = fs.readFileSync(DB_FILE, 'utf-8');
        const submissions: Submission[] = JSON.parse(data);
        res.json(submissions);
    } catch (err) {
        console.error('Error reading from database:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

// Endpoint to delete a submission
app.delete('/delete/:index', (req: Request, res: Response) => {
    const index = parseInt(req.params.index);

    try {
        if (!fs.existsSync(DB_FILE)) {
            return res.status(404).json({ error: 'No submissions found.' });
        }

        const data = fs.readFileSync(DB_FILE, 'utf-8');
        let submissions: Submission[] = JSON.parse(data);

        if (index < 0 || index >= submissions.length) {
            return res.status(400).json({ error: 'Invalid index.' });
        }

        submissions.splice(index, 1);
        fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
        res.json({ message: 'Submission deleted successfully.' });
    } catch (err) {
        console.error('Error deleting from database:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

// Endpoint to edit a submission
app.put('/edit/:index', (req: Request, res: Response) => {
    const index = parseInt(req.params.index);
    const { name, email, phone, github_link, stopwatch_time }: Submission = req.body;

    if (!name || !email || !phone || !github_link || !stopwatch_time) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        if (!fs.existsSync(DB_FILE)) {
            return res.status(404).json({ error: 'No submissions found.' });
        }

        const data = fs.readFileSync(DB_FILE, 'utf-8');
        let submissions: Submission[] = JSON.parse(data);

        if (index < 0 || index >= submissions.length) {
            return res.status(400).json({ error: 'Invalid index.' });
        }

        submissions[index] = { name, email, phone, github_link, stopwatch_time };
        fs.writeFileSync(DB_FILE, JSON.stringify(submissions, null, 2));
        res.json({ message: 'Submission updated successfully.' });
    } catch (err) {
        console.error('Error updating database:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

// Endpoint to search by email
app.get('/search', (req: Request, res: Response) => {
    const email = req.query.email as string;

    try {
        if (!fs.existsSync(DB_FILE)) {
            return res.status(404).json({ error: 'No submissions found.' });
        }

        const data = fs.readFileSync(DB_FILE, 'utf-8');
        const submissions: Submission[] = JSON.parse(data);
        const result = submissions.filter(sub => sub.email === email);

        if (result.length === 0) {
            return res.status(404).json({ error: 'No submissions found with the given email.' });
        }

        res.json(result);
    } catch (err) {
        console.error('Error searching database:', err);
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
