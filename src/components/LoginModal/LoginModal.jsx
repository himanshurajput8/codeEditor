import React from 'react'
import './LoginModal.css'

const handleGoogleAuthentication = () => {

}

export default function LoginModal() {
  return (
        <div className="modal-backdrop">
      <div className="modal-content">
        <h1>Welcome to</h1>
        <h1>Code2gthr</h1>
        <p>Please sign in to continue</p>    

        <div className="btn-group">
          <button className="oauth-btn github"
            onClick={handleGoogleAuthentication}
          >
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
            Sign In With GitHub
          </button>

          <button className="oauth-btn google">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" />
            Sign In With Google
          </button>
        </div>

        <button className="cancel-btn" >Cancel</button>
      </div>
    </div>
  )
}
