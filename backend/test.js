function modifyFacebookURL(url) {
    // Check if the URL contains "www.facebook.com/"
    if (url.includes('www.facebook.com/')) {
      // Insert "/messages/t/" after "www.facebook.com/"
      const modifiedURL = url.replace('www.facebook.com/', 'www.facebook.com/messages/t/');
  
      // Check if the modified URL contains "/profile.php?id="
      if (modifiedURL.includes('/profile.php?id=')) {
        // Replace "/profile.php?id=" with "/messages/t/"
        return modifiedURL.replace('/profile.php?id=', '/');
      } else {
        // If not, return the modified URL
        return modifiedURL;
      }
    } else {
      // If "www.facebook.com/" is not present, return the original URL
      return url;
    }
  }
  
  // Example usage:
  const originalURL1 = 'https://www.facebook.com/profile.php?id=100008664437191';
  const modifiedURL1 = modifyFacebookURL(originalURL1);
  console.log(modifiedURL1);  // Output: https://www.facebook.com/messages/t/pahari7
  
  const originalURL2 = 'https://www.facebook.com/profile.php?id=1000765656549';
  const modifiedURL2 = modifyFacebookURL(originalURL2);
  console.log(modifiedURL2);  // Output: https://www.facebook.com/messages/t/1000765656549
  