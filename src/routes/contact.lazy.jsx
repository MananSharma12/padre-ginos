import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact.js";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message")
      );
    }
  });

  if (mutation.isError) {
    return <h1>Something went wrong</h1>
  }

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <h3>Submitted</h3>
      ): (
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="Name" required />
          <input name="email" placeholder="Email" type="email" required />
          <textarea name="message" placeholder="Message" required />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  )
}
