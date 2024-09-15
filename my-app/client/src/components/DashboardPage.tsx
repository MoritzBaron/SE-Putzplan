import React, { useEffect, useState } from "react";

const DashboardPage: React.FC = () => {
    const [chores, setChores] = useState([]);
    const [error, SetError] = useState("");

    useEffect(() => {
        const fetchChores = async () => {
            const token = localStorage.getItem("token");

            try {
                const response = await fetch("/api/chores", {
                    headers: {
                        Authorization: "Bearer ${token",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setChores(data);
                } else {
                    console.error("failed to fetch chores");
                }
            } catch (err) {
                console.error("error fetching cores:", err);
                SetError("an error occured.")
            }
        };


        fetchChores();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <ul>
                {chores.map((chore) => (
                    <li key={chore.id}>{chore.description} - Due {<chore.due_data}</li>
                ))}
            </ul>
        </div>
    );
};

export default DashboardPage;