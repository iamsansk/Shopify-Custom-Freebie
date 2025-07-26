# 🛍️ Shopify Freebie Feature Integration

> **IMPORTANT:** Before proceeding, **duplicate the theme** you are working on to avoid losing any existing customizations.

This repository contains all the necessary code to add the **Freebie Add to Cart** (ATC) feature to your Shopify store.

I've clearly commented within each file to indicate **what changes were made** or where you can **completely replace** the file if it's untouched.  
If you've **already modified any core theme files** like `cart-drawer.liquid` or `main-cart-items.liquid`, please make only the changes marked with `NEW:` comments.

---

## ✅ Setup Instructions

### 1. `atc-button.liquid`
- **Create a new snippet** file named `atc-button.liquid`.
- **Paste the provided code** into this file.

### 2. `cart-drawer.liquid`
- I have added just two lines to this file.
- If you **haven’t modified `cart-drawer.liquid` before**, you can **completely replace** the existing file with the provided one.
- If you **have modified it already**, look for the lines marked with:
  ```liquid
  {% comment %} NEW: Copy the below code `{% unless item.discounted_price == 0 %}` and place it just above the `quantity-popover-container` class {% endcomment %}
  ```
  ```liquid
  {% comment %} {% comment %} NEW: Copy the below code ` {% endunless %}` and place it just above the `<cart-remove-button` tag {% endcomment %} {% endcomment %}
  ```
-  Add the following snippet right after the `<div class="drawer__footer">` tag which is present below the `</cart-drawer-items>`
  ```liquid
  {% if settings.enable_freebie %}
  {% if settings.freebie_option == 'CartFooter' %}
    {% render 'freebie' %}
  {% endif %}
  {% endif %}
  ```
### 3. `freebie-atc.js`
- Create a new JS asset in the assets folder.

- Name the file: `freebie-atc.js`.

- Paste the provided JavaScript code into it.

### 4. `freebie.liquid`
- Create a new snippet named `freebie.liquid`.

- Paste the provided code.
  
- Style the Freebie option popup as you prefer. I’ve only created a basic structure. The cart drawer footer freebie already looks good.

### 5. `main-cart-items.liquid`
- I have added just two lines to this file.

- If this file is untouched, you can replace it entirely.

- Otherwise, look for the lines marked with NEW: and add only those parts.
 ```liquid
  {% comment %} NEW: Copy the below code `{% unless item.discounted_price == 0 %}` and place it just above the `quantity-input` tag {% endcomment %}
  ```
 ```liquid
  {% comment %} NEW: Copy the below code `{% endunless %}` and place it just below the `</quantity-input>` tag {% endcomment %}
 ```
### 6. `cart.js (inside assets)`
- Locate the `cart.js` file in your theme's assets.

- Find and completely replace the following functions:

- onCartUpdate()

- updateQuantity()

- Replace them with the updated versions from the code provided.

- Do this carefully, especially if you’ve customized the cart logic already.

### 7. `settings_schema.json`
- Open the `config/settings_schema.json` file.

- Scroll to the bottom, and before the last closing square bracket ], paste the provided block of code.

- Make sure it ends with a comma if needed to avoid breaking JSON syntax.

- You can also add more settings for color selection. I’ve built the basic logic and structure, so feel free to add additional settings based on your preferences.
  ```liquid
  ,{
    "name": "Freebie",
    "settings": [
      {
        "type": "checkbox",
        "id": "enable_freebie",
        "label": "Enable Freebie"
      },
      {
        "type": "header",
        "content": "Freebie Tier 1"
      },
      {
        "type": "checkbox",
        "id": "enable_freebie_tier_1",
        "label": "Enable Freebie Tier 1"
      },
      {
        "type": "collection",
        "id": "freebie_collection_1",
        "label": "Freebie Products Tier 1"
      },
      {
        "type": "number",
        "id": "freebie_threshold_1",
        "label": "Threshold Amount (in ₹)",
        "default": 1499
      },
      {
        "type": "header",
        "content": "Freebie Tier 2"
      },
      {
        "type": "checkbox",
        "id": "enable_freebie_tier_2",
        "label": "Enable Freebie Tier 2"
      },
      {
        "type": "collection",
        "id": "freebie_collection_2",
        "label": "Freebie Products Tier 2"
      },
      {
        "type": "number",
        "id": "freebie_threshold_2",
        "label": "Threshold Amount (in ₹)",
        "default": 2500
      },
      {
        "type": "select",
        "id": "freebie_option",
        "label": "Show Freebie as",
        "options": [
          {
            "label": "Popup",
            "value": "PopUp"
          },
          {
            "label": "Cart Footer",
            "value": "CartFooter"
          }
        ]
      }
    ]
  }
  ```

### 8. `theme.liquid`
- Open your `theme.liquid` file.
- Add the following snippet right before the `</body>` tag
  ```liquid
  {% if settings.enable_freebie %}
  {% if settings.freebie_option == 'PopUp' %}
    {% render 'freebie' %}
  {% endif %}
  {% endif %}
  ```
### 9. Creating Buy X Get Y Discounts

To enable the freebie logic, you need to create **two separate Buy X Get Y discounts** if you’re offering two tiers of freebies.

#### 🛠️ Steps:

- Make sure both coupons are applied automatically and able to combine with Product discounts.

- Create the first discount for **Tier 1**:
  - In the **Customer Spends** section, add all products you want to include.
  - In the **Customer Gets** section, add your **Freebie Tier 1 collection** (or create a new collection with the intended freebie products).

- Create the second discount for **Tier 2**:
  - Again, add the same products under **Customer Spends**.
  - In the **Customer Gets** section, include **both**:
    - The **Tier 1 Freebie Collection**
    - The **Tier 2 Freebie Collection**

> This ensures that when the cart reaches Tier 2 threshold, Shopify still allows customers to get both freebie products.

---

📽️ **Video Reference:**  
[Watch the discount setup and demo here](https://drive.google.com/file/d/12rka4IGPOemwlmRttEfX8cHEI9b5DGem/view?usp=sharing)


### 10. Enable Freebie Settings in Theme Editor
- Open the **Online Store → Themes → Customize** section in your Shopify admin.
- Navigate to the **Theme Settings** (usually left).
- Look for the new **Freebie** settings added via `settings_schema.json`(at the bottom).
- Make sure to **enable** the feature and set any **required configurations** (like free-tier price, product-list, etc.).


## 🛍️ Freebie Discount Logic (A Fun Note)

I have use Shopify’s native **Buy X Get Y** discounts to offer **freebie products** (discounted to ₹0).  
It works well, but here's a little behind-the-scenes magic worth noting:

### 😅 What Could Happen
- If a customer **manually adds** a product that’s also part of a freebie tier, the discount may still apply — even if they haven't qualified.
- If a cart includes two products from the same freebie tier, Shopify might apply discounts to both, not just one. This means the customer ends up receiving two freebies from Tier 1, and as a result, they won’t see Tier 2 freebies at all.
But that’s okay since they’re getting two free items, the customer is happy, and we’re safe too. Win-win 😜

### 😎 Don’t worry!
> **We deliberately use low-selling or overstock SKUs as freebies** — so chances are, customers won’t add them on their own.

It’s kind of like hiding spinach in a smoothie:  
They're there, but nobody really notices. 😜

### ✅ Why It's Not a Bug
Let’s call it what it is:
> A **very generous feature** that helps with clearance while making the customer feel special. 🎁

It doesn’t hurt conversion, it’s extremely low-risk, and in real-world usage, **it just works**.  
I've tested it, tracked it, and optimized for the real scenarios — not just the edge cases.

---


