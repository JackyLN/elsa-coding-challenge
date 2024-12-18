# Elsa Coding Challenge

## Solution

``` mermaid
graph TD
    A[Participant App (Frontend)] -->|REST API (e.g., /participants)| B[Backend]
    A -->|Socket.IO (Real-time communication)| C[Socket Gateway (Leaderboard)]
    B -->|Database Queries| D[Database]
    C -->|Emit Leaderboard Updates| A

    subgraph Backend
        B[REST API]
        C[Socket Gateway (Leaderboard)]
    end

    subgraph Database
        D1[Participants Table]
        D2[Answers Table]
    end

    D -->|Participant Data| B
    D -->|Leaderboard Data| B
    B -->|Leaderboard Updates| C
    C -->|Push to Connected Clients| A
```

## Backend
### Todo and further enhancement
- Create Data object properly, especially for Data Response Object (currently all functions return `Promise<any>`)
- Separate Repository layer to decouple the model database
- Add log
- Add unit test
## Frontend
