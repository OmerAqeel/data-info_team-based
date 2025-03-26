import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import questionsData from './questions.json'; // Import the JSON file

const Activity = () => {
    // State to manage button colors, attempts, and scores
    const [buttonStates, setButtonStates] = useState<{
        [key: number]: {
            colors: string[];
            attempts: number;
            score: number;
            solved: boolean;
        }
    }>({});

    // State to track total score
    const [totalScore, setTotalScore] = useState(0);

    // Initialize button states when component mounts
    useEffect(() => {
        const initialStates = questionsData.reduce((acc, question) => {
            acc[question.id] = {
                colors: Array(5).fill('gray'),
                attempts: 0,
                score: 0,
                solved: false
            };
            return acc;
        }, {});
        setButtonStates(initialStates);
    }, []);

    // Handle button click logic
    const handleButtonClick = (rowId: number, optionIndex: number) => {
        // Get the current state for this row
        const currentState = buttonStates[rowId];

        // Prevent clicks if the row is already solved
        if (currentState.solved) return;

        const selectedOption = `Option ${String.fromCharCode(65 + optionIndex)}`;
        const correctOption = questionsData.find(q => q.id === rowId)?.correct;

        // Create a copy of the current colors
        const newColors = [...currentState.colors];
        let newScore = currentState.score;
        let newAttempts = currentState.attempts + 1;
        let isSolved = false;

        // Check if the selected option is correct
        if (selectedOption === correctOption) {
            // Determine score based on attempts
            if (newAttempts === 1) {
                newScore = 4;
            } else if (newAttempts === 2) {
                newScore = 3;
            } else if (newAttempts === 3) {
                newScore = 2;
            } else if (newAttempts > 3) {
                newScore = 1;
            }

            // Color the correct button green and mark as solved
            newColors[optionIndex] = 'green';
            isSolved = true;
        } else {
            // Color the selected button red
            newColors[optionIndex] = 'red';

            // If it's the last attempt (> 3), show the correct answer
            if (newAttempts > 3) {
                const correctIndex = questionsData
                    .find(q => q.id === rowId)?.options
                    .findIndex(opt => opt === correctOption);
                
                if (correctIndex !== undefined) {
                    newColors[correctIndex] = 'green';
                }
                newScore = 0;
                isSolved = true;
            }
        }

        // Update the state
        const updatedButtonStates = {
            ...buttonStates,
            [rowId]: {
                colors: newColors,
                attempts: newAttempts,
                score: newScore,
                solved: isSolved
            }
        };
        setButtonStates(updatedButtonStates);

        // Calculate total score
        const newTotalScore = Object.values(updatedButtonStates).reduce((sum, state) => sum + state.score, 0);
        setTotalScore(newTotalScore);
    };

    return (
        <div
            style={{
                backgroundColor: "#f3f4f6",
                padding: "1.5rem",
                borderRadius: "0.5rem",
            }}
        >
            <h1
                style={{
                    textAlign: "center",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                }}
            >
                SCRATCH OFF BUTTONS TO EXPOSE ANSWERS
            </h1>

            <Table 
                className='table-container'
                style={{
                    height: "80vh",
                }}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]"></TableHead>
                        <TableHead className="w-[150px]" style={{ textAlign: "center" }}>A</TableHead>
                        <TableHead className="w-[150px]" style={{ textAlign: "center" }}>B</TableHead>
                        <TableHead className="w-[150px]" style={{ textAlign: "center" }}>C</TableHead>
                        <TableHead className="w-[150px]" style={{ textAlign: "center" }}>D</TableHead>
                        <TableHead className="w-[150px]" style={{ textAlign: "center" }}>E</TableHead>
                        <TableHead style={{ textAlign: "center" }}>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {questionsData.map((question) => (
                        <TableRow key={question.id}>
                            <TableCell className="font-medium">{question.id}</TableCell>
                            {question.options.map((_, idx) => (
                                <TableCell key={idx}>
                                    <Button
                                        style={{
                                            backgroundColor: buttonStates[question.id]?.colors[idx] || 'gray',
                                            color: 'white',
                                            cursor: buttonStates[question.id]?.solved ? 'not-allowed' : 'pointer'
                                        }}
                                        className="w-full"
                                        onClick={() => handleButtonClick(question.id, idx)}
                                        disabled={buttonStates[question.id]?.solved}
                                    >
                                        {String.fromCharCode(65 + idx)}
                                    </Button>
                                </TableCell>
                            ))}
                            <TableCell style={{ textAlign: "center" }}>
                                {buttonStates[question.id]?.score || 0}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={5} style={{ textAlign: "right", fontWeight: "bold", fontSize: "1.25rem" }}>
                            Total Score:
                        </TableCell>
                        <TableCell style={{ textAlign: "center", fontWeight: "bold", fontSize: "1.25rem" }}>
                            {totalScore}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
};

export default Activity;