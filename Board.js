// components/Board.js
import React from 'react';
import Column from './Column';
import './Board.css';

const Board = ({ tickets, users, grouping, sorting }) => {
  const getPriorityName = (priority) => {
    const priorities = {
      4: 'Urgent',
      3: 'High',
      2: 'Medium',
      1: 'Low',
      0: 'No priority'
    };
    return priorities[priority];
  };

  const getGroupedTickets = () => {
    let groups = {};

    if (grouping === 'status') {
      tickets.forEach(ticket => {
        if (!groups[ticket.status]) {
          groups[ticket.status] = [];
        }
        groups[ticket.status].push(ticket);
      });
    } else if (grouping === 'user') {
      users.forEach(user => {
        groups[user.name] = tickets.filter(ticket => 
          ticket.userId === user.id
        );
      });
    } else if (grouping === 'priority') {
      [4, 3, 2, 1, 0].forEach(priority => {
        groups[getPriorityName(priority)] = tickets.filter(ticket => 
          ticket.priority === priority
        );
      });
    }

    // Sort tickets within each group
    Object.keys(groups).forEach(key => {
      groups[key].sort((a, b) => {
        if (sorting === 'priority') {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return groups;
  };

  const groupedTickets = getGroupedTickets();

  return (
    <div className="board">
      {Object.entries(groupedTickets).map(([groupName, tickets]) => (
        <Column 
          key={groupName}
          title={groupName}
          tickets={tickets}
          users={users}
        />
      ))}
      
    </div>
  );
};

export default Board;