import React from 'react';
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
import { useState } from "react";

const Activity = () => {
    // Example data array with 10 items
    const data = Array.from({ length: 10 }, (_, index) => ({
        id: index + 1,
        buttons: ["A", "B", "C", "D", "E"],
    }));

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
            >SCRATCH OFF BUTTONS TO EXPOSE ANSWERS</h1>

            <div>
            <Table 
            className='table-container'
            style={{
                height: "80vh",
            }}

            >
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[150px]"></TableHead>
                        <TableHead className="w-[150px]"
                            style={{
                                textAlign: "center",
                            }}
                        >A</TableHead>
                        <TableHead className="w-[150px]"
                            style={{
                                textAlign: "center",
                            }}
                        >B</TableHead>
                        <TableHead className="w-[150px]"
                            style={{
                                textAlign: "center",
                            }}
                        >C</TableHead>
                        <TableHead className="w-[150px]"
                            style={{
                                textAlign: "center",
                            }}
                        >D</TableHead>
                        <TableHead className="w-[150px]"
                            style={{
                                textAlign: "center",
                            }}
                        >E</TableHead>
                        <TableHead
                            style={{
                                textAlign: "center",
                            }}
                        >Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            {item.buttons.map((buttonLabel, idx) => (
                                <TableCell key={idx}>
                                    <Button
                                        style={
                                            {
                                                backgroundColor: "gray"
                                            }
                                        }
                                        className="w-full"
                                        onMouseEnter={(e) => {
                                            (e.target as HTMLElement).style.cursor = "pointer";
                                        }
                                    }
                                    ></Button>
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            </div>
        </div>
    );
};

export default Activity;