import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
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
        }
    }>({});

    // Initialize button states when component mounts
    useEffect(() => {
        const initialStates = questionsData.reduce((acc, question) => {
            acc[question.id] = {
                colors: Array(5).fill('gray'),
                attempts: 0,
                score: 0
            };
            return acc;
        }, {});
        setButtonStates(initialStates);
    }, []);

    // Handle button click logic
    const handleButtonClick = (rowId: number, optionIndex: number) => {
        // Get the current state for this row
        const currentState = buttonStates[rowId];
        const selectedOption = `Option ${String.fromCharCode(65 + optionIndex)}`;
        const correctOption = questionsData.find(q => q.id === rowId)?.correct;

        // Create a copy of the current colors
        const newColors = [...currentState.colors];
        let newScore = currentState.score;
        let newAttempts = currentState.attempts + 1;

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

            // Color the correct button green
            newColors[optionIndex] = 'green';
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
            }
        }

        // Update the state
        setButtonStates(prev => ({
            ...prev,
            [rowId]: {
                colors: newColors,
                attempts: newAttempts,
                score: newScore
            }
        }));
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
                                            color: 'white'
                                        }}
                                        className="w-full"
                                        onClick={() => handleButtonClick(question.id, idx)}
                                        onMouseEnter={(e) => {
                                            (e.target as HTMLElement).style.cursor = "pointer";
                                        }}
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
            </Table>
        </div>
    );
};

export default Activity;