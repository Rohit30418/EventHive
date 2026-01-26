import { fireEvent, render, screen } from '@testing-library/react'
import OrgniserRegistration from "./OrgniserRegistration" 
import { beforeEach, describe, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';



describe("Orgniser Registration",()=>{
    const setup = () => {
    render(<BrowserRouter><OrgniserRegistration /></BrowserRouter>);
  };

  beforeEach(()=>{
  vi.resetAllMocks();
  })
    it("renders all form fields", () => {
    setup();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByLabelText(/I agree the terms and conditions/i)).toBeInTheDocument();
  });

  it ("shows error messages for empty fields on submit", async () => {

    setup();
    const submitButton=screen.getByText("Submit");
    fireEvent.click(submitButton);
    expect( await screen.findByText("Name must be at least 3 characters long")).toBeInTheDocument();
    expect(await screen.findByText("Invalid email address")).toBeInTheDocument();
  })

  it("should compair the password and confirm passsword",async()=>{
    setup();
    const button=screen.getByRole("button",{name:/submit/i});
    const passwordInput=screen.getByPlaceholderText("Password");
    const confirmPasswordInput=screen.getByPlaceholderText("Confirm Password");
    fireEvent.change(passwordInput,{target:{value:"Password1!"}});
    fireEvent.change(confirmPasswordInput,{target:{value:"Password2!"}});
    fireEvent.click(button);
    expect(await screen.findByText("/passwords do not match/i")).toBeInTheDocument();
  })
})

