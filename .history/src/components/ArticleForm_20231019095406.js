import React, { useState } from "react";
import { createArticle } from "../services/api";
import { syncArticleWithCategories } from "../services/api";

function ArticleForm() {
  const initialFormData = {
    title: "",
    perex: "",
    content: "",
    author: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data from the form:", formData);

    try {
      const createdArticle = await createArticle(formData);
      setSubmitMessage("Article has been successfully submitted!");
      setIsSubmitted(true);
      setFormData({ ...initialFormData });

      // Now you can sync the article with specific categories
      const articleId = createdArticle.id;
      const categoryIds = [1, 2, 3]; // Change this according to your needs
      await syncArticleWithCategories(articleId, categoryIds);
    } catch (error) {
      console.error("Error creating the article:", error);
      setSubmitMessage("Error submitting the article");
    }
  }

  return (
    <div>
      <h2>Create a New Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="perex">Perex:</label>
          <input
            type="text"
            id="perex"
            name="perex"
            value={formData.perex}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        {isSubmitted ? null : (
          <button type="submit">Submit Article</button>
        )}
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
