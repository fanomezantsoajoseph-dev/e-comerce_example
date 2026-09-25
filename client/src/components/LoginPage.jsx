import React from "react";

export const LoginPage = ({onClose}) => {
return (
<div className="modal-backdrop" onClick={onClose}>
<div className="modal-content" onClick={(e) => e.stopPropagation()}>
     <button
          className="close-btn"
          onClick={onClose}
          style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
          // aria-label="Close modal"
     >
          <X size={20} />
     </button>

     <div className="detail-grid">
          <h1>login</h1>
     </div>
</div>
</div>
);
};
