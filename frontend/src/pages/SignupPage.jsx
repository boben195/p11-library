import React from "react";

const SignupPage = () => {
  return (
    <div>
      <h2>Sign Up</h2>
      <form action="">
        <div>
          <label htmlFor="">Username</label>
          <input type="text" />
        </div>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" />
        </div>
        <div>
          <label htmlFor="">Password</label>
          <input type="password" />
        </div>
        <div>
          <label htmlFor="">Confirm Password</label>
          <input type="password" />
        </div>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
