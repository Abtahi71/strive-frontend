"use client";

import { colors } from "@/src/styles/colors";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(dateStr: string) {
  return new Date(dateStr).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MemberDetailModal({
  member,
  onClose,
}: {
  member: any;
  onClose: () => void;
}) {
  return (
    <>
      <div className="modal-overlay" onClick={onClose} />
      <div className="modal-content member-modal">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="member-header">
          <div className="member-avatar">
            {member.user.username.charAt(0).toUpperCase()}
          </div>
          <div className="member-header-info">
            <h2>{member.user.username}</h2>
            <span className={`role-badge role-${member.role.toLowerCase()}`}>
              {member.role}
            </span>
          </div>
        </div>

        <div className="member-details">
          <div className="detail-item">
            <span className="detail-label">Email</span>
            <span className="detail-value">
              {member.user.email || "Not provided"}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Joined</span>
            <span className="detail-value">
              {formatDateTime(member.joinedAt)}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Current Streak</span>
            <span className="detail-value streak-value">
              🔥 {member.currentStreak} days
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Longest Streak</span>
            <span className="detail-value">
              ⭐ {member.longestStreak || member.currentStreak} days
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1000;
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: ${colors.light};
          border-radius: 16px;
          padding: 2rem;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          z-index: 1001;
          animation: slideUp 0.3s ease;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: none;
          border: none;
          font-size: 2rem;
          color: ${colors.dark};
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
          line-height: 1;
        }

        .modal-close:hover {
          opacity: 1;
        }

        .member-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          margin-bottom: 2rem;
          padding-bottom: 1.5rem;
          border-bottom: 2px solid ${colors.secondary}40;
        }

        .member-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: ${colors.secondary};
          color: ${colors.light};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          flex-shrink: 0;
        }

        .member-header-info {
          flex: 1;
        }

        .member-header-info h2 {
          margin: 0 0 0.5rem 0;
          color: ${colors.dark};
          font-size: 1.5rem;
        }

        .member-details {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .detail-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid ${colors.secondary}20;
        }

        .detail-item:last-child {
          border-bottom: none;
        }

        .detail-label {
          color: ${colors.dark};
          opacity: 0.7;
          font-weight: 500;
        }

        .detail-value {
          color: ${colors.dark};
          font-weight: 600;
        }

        .streak-value {
          color: ${colors.secondary};
        }

        .role-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .role-admin {
          background: ${colors.primary};
          color: ${colors.light};
        }

        .role-member {
          background: ${colors.secondary}40;
          color: ${colors.dark};
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translate(-50%, -40%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }
      `}</style>
    </>
  );
}
