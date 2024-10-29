import React from 'react';
import './Card.css';

const Card = ({ ticket, user }) => {
  return (
    <div className="card">
      <div className="card-header">
        <span className="ticket-id">{ticket.id}</span>
        <div className="user-avatar">
          {user && (
            <>
              <div className="avatar">
                {user.name.charAt(0)}
              </div>
              <span className={`status-dot ${user.available ? 'available' : ''}`} />
            </>
          )}
        </div>
      </div>
      <div className="card-title">{ticket.title}</div>
      <div className="card-tags">
        <span className="tag priority">
          {ticket.priority === 4 && '⚡'}
          {ticket.priority === 3 && '🔴'}
          {ticket.priority === 2 && '🟡'}
          {ticket.priority === 1 && '🟢'}
          {ticket.priority === 0 && '⚪'}
        </span>
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            ⚪ {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Card;