import React, { useState } from "react";
import { createArticle, updateArticleCategory } from "../services/api";

function ArticleForm() {
  const initialFormData = {
    title: "",
    perex: "",
    content: "",
    author: "",
  };
  const [formData, setFormData] = useState({ ...initialFormData });
  const [categoryIds, setCategoryIds] = useState([]);
  const [submitMessage, setSubmitMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCategoryIds([value]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Data from the form:", formData);

    try {
      const article = await createArticle(formData);
      await updateArticleCategory(article.id, categoryIds);

      setSubmitMessage("Article has been successfully submitted!");
      setIsSubmitted(true);
      setFormData({ ...initialFormData });
    } catch (error) {
      console.error("Error creating the article:", error);
      setSubmitMessage("Error submitting the article");
    }
  };

  return (
    <div>
      <h2>Create a new article</h2>
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
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            onChange={handleCategoryChange}
          >
            <option value="1">Category 1</option>
            <option value="2">Category 2</option>
            <option value="3">Category 3</option>
          </select>
        </div>

        {isSubmitted ? null : (
          <button type="submit">Submit article</button>
        )}
      </form>

      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}

export default ArticleForm;
