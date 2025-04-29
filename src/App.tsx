import React, { useState } from "react";
import LoginForm from "./components/LoginForm.js";
import DynamicForm from "./components/DynamicForm.js";
import { createUser, getForm } from "./api/api.js";

function App() {
  const [form, setForm] = useState(null);

  const handleLogin = async (rollNumber, name) => {
    try {
      await createUser(rollNumber, name);
      const data = await getForm(rollNumber);
      setForm(data.form);
    } catch (err) {
      alert("Error during login or form fetch");
    }
  };

  return (
    <div className="App">
      {form ? <DynamicForm form={form} /> : <LoginForm onLogin={handleLogin} />}
    </div>
  );
}

export default App;
