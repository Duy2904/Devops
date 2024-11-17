import sanitizeHtml from 'sanitize-html';

/**
 * Sanitize HTML content to prevent XSS attacks, allowing only safe HTML tags including <img>.
 *
 * This function uses the sanitize-html library to clean the provided HTML content by
 * removing any potentially harmful elements and attributes that could lead to cross-site
 * scripting (XSS) attacks. By default, it permits a standard set of HTML tags and attributes
 * considered safe, and here it extends this set to also allow <img> tags.
 *
 * @param {string} content - The HTML content to be sanitized.
 * @returns {string} - The sanitized HTML content.
 *
 * Usage:
 * const sanitizedContent = sanitizeContentWithImages(unsafeHtmlContent);
 */
export const sanitizeContentWithImages = (content: string) => {
    return sanitizeHtml(content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    });
};
