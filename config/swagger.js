const swaggerSpec = {
  openapi: "3.0.0",

  info: {
    title: "Ecommerce ANGADI API",
    version: "1.0.0",
    description: "Ecommerce Backend API Documentation"
  },

  servers: [
    {
      url: "http://localhost:5000",
      description: "Local server"
    }
  ],

  tags: [
    {
      name: "Auth",
      description: "User authentication APIs"
    },
    {
      name: "Users",
      description: "User management APIs - Admin only"
    },
    {
      name: "Products",
      description: "Product management APIs"
    },
    {
      name: "CSV",
      description: "Product CSV import and export APIs"
    }
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    },

    schemas: {
      // =========================
      // USER
      // =========================

      User: {
        type: "object",
        properties: {
          _id: {
            type: "string",
            example: "68c123456789abcdef123456"
          },

          username: {
            type: "string",
            example: "Bharath"
          },

          email: {
            type: "string",
            format: "email",
            example: "bharath@gmail.com"
          },

          role: {
            type: "string",
            enum: ["user", "admin"],
            example: "user"
          },

          createdAt: {
            type: "string",
            format: "date-time"
          },

          updatedAt: {
            type: "string",
            format: "date-time"
          }
        }
      },

      // =========================
      // SIGNUP
      // =========================

      SignupRequest: {
        type: "object",

        required: [
          "username",
          "email",
          "password"
        ],

        properties: {
          username: {
            type: "string",
            example: "Bharath"
          },

          email: {
            type: "string",
            format: "email",
            example: "bharath@gmail.com"
          },

          password: {
            type: "string",
            format: "password",
            example: "123456"
          },

          role: {
            type: "string",
            enum: ["user", "admin"],
            default: "user",
            example: "user"
          }
        }
      },

      // =========================
      // LOGIN
      // =========================

      LoginRequest: {
        type: "object",

        required: [
          "email",
          "password"
        ],

        properties: {
          email: {
            type: "string",
            format: "email",
            example: "bharath@gmail.com"
          },

          password: {
            type: "string",
            format: "password",
            example: "123456"
          }
        }
      },

      // =========================
      // UPDATE USER
      // =========================

      UpdateUserRequest: {
        type: "object",

        properties: {
          username: {
            type: "string",
            example: "Bharath Updated"
          },

          email: {
            type: "string",
            format: "email",
            example: "bharathnew@gmail.com"
          },

          password: {
            type: "string",
            format: "password",
            example: "newpassword123"
          },

          role: {
            type: "string",
            enum: ["user", "admin"],
            example: "user"
          }
        }
      },

      // =========================
      // PRODUCT
      // =========================

      Product: {
        type: "object",

        properties: {
          _id: {
            type: "string",
            example: "68c123456789abcdef123456"
          },

          name: {
            type: "string",
            example: "HP Laptop"
          },

          description: {
            type: "string",
            example: "HP laptop with 8GB RAM and 512GB SSD"
          },

          price: {
            type: "number",
            minimum: 0,
            example: 45000
          },

          category: {
            type: "string",
            example: "Electronics"
          },

          stock: {
            type: "number",
            minimum: 0,
            example: 10
          },

          published: {
            type: "boolean",
            example: false
          },

          ownerId: {
            type: "string",
            example: "68c123456789abcdef123456"
          },

          createdAt: {
            type: "string",
            format: "date-time"
          },

          updatedAt: {
            type: "string",
            format: "date-time"
          }
        }
      },

      // =========================
      // CREATE / UPDATE PRODUCT
      // =========================

      ProductRequest: {
        type: "object",

        required: [
          "name",
          "description",
          "price",
          "category",
          "stock"
        ],

        properties: {
          name: {
            type: "string",
            example: "HP Laptop"
          },

          description: {
            type: "string",
            example: "HP laptop with 8GB RAM and 512GB SSD"
          },

          price: {
            type: "number",
            minimum: 0,
            example: 45000
          },

          category: {
            type: "string",
            example: "Electronics"
          },

          stock: {
            type: "number",
            minimum: 0,
            example: 10
          }
        }
      }
    }
  },

  paths: {

    // =====================================================
    // AUTH
    // =====================================================

    "/api/v1/auth/signup": {
      post: {
        tags: ["Auth"],
        summary: "Register a new user",
        description: "Create a new user account.",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SignupRequest"
              }
            }
          }
        },

        responses: {
          201: {
            description: "User Signup Successful"
          },

          400: {
            description: "Fields are required or email already registered"
          },

          500: {
            description: "Unable to create the user"
          }
        }
      }
    },

    "/api/v1/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login user",
        description: "Login using email and password and receive a JWT token.",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Login Successful",

            content: {
              "application/json": {
                example: {
                  message: "Login Successful",
                  token: "JWT_TOKEN_HERE",
                  user: {
                    id: "68c123456789abcdef123456",
                    username: "Bharath",
                    email: "bharath@gmail.com",
                    role: "user"
                  }
                }
              }
            }
          },

          400: {
            description: "All Fields are required"
          },

          401: {
            description: "Invalid email or password"
          },

          404: {
            description: "Invalid email or password"
          },

          500: {
            description: "Unable to login the user"
          }
        }
      }
    },

    "/api/v1/auth/signin": {
      post: {
        tags: ["Auth"],
        summary: "Sign in user",
        description: "Sign in using email and password.",

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Login Successful"
          },

          400: {
            description: "All Fields are required"
          },

          401: {
            description: "Invalid email or password"
          },

          404: {
            description: "Invalid email or password"
          },

          500: {
            description: "Unable to login the user"
          }
        }
      }
    },

    "/api/v1/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Logout user",
        description: "Clear the authentication cookie.",

        responses: {
          200: {
            description: "Logout Successful",

            content: {
              "application/json": {
                example: {
                  message: "Logout Successful"
                }
              }
            }
          }
        }
      }
    },


    // =====================================================
    // USERS
    // =====================================================

    "/api/v1/user": {
      get: {
        tags: ["Users"],
        summary: "Get all users",
        description: "Get all users. Admin authentication is required.",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "Users retrieved successfully",

            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/User"
                  }
                }
              }
            }
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "Admin access required"
          },

          500: {
            description: "Unable to get the users"
          }
        }
      }
    },


    "/api/v1/user/{id}": {

      get: {
        tags: ["Users"],
        summary: "Get user by ID",
        description: "Get one user using MongoDB ObjectId. Admin only.",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "68c123456789abcdef123456"
          }
        ],

        responses: {
          200: {
            description: "User found",

            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User"
                }
              }
            }
          },

          400: {
            description: "Invalid user id"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "Admin access required"
          },

          404: {
            description: "User not found"
          },

          500: {
            description: "Unable to get the user by id"
          }
        }
      },


      put: {
        tags: ["Users"],
        summary: "Update user",
        description: "Update username, email, password or role. Admin only.",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "68c123456789abcdef123456"
          }
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/UpdateUserRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "User updated successfully"
          },

          400: {
            description: "Invalid user id or email is already taken"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "Admin access required"
          },

          404: {
            description: "User not found"
          },

          500: {
            description: "Unable to update the user"
          }
        }
      },


      delete: {
        tags: ["Users"],
        summary: "Delete user",
        description: "Delete a user. Admin only.",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "68c123456789abcdef123456"
          }
        ],

        responses: {
          200: {
            description: "User deleted successfully"
          },

          400: {
            description: "Invalid user id"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "Admin access required"
          },

          404: {
            description: "User not found"
          },

          500: {
            description: "Unable to delete the user"
          }
        }
      }
    },


    // =====================================================
    // PRODUCTS
    // =====================================================

    "/api/v1/products": {

      post: {
        tags: ["Products"],
        summary: "Create product",
        description: "Create a new product. Admin authentication is required.",

        security: [
          {
            bearerAuth: []
          }
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductRequest"
              }
            }
          }
        },

        responses: {
          201: {
            description: "Product created successfully"
          },

          400: {
            description: "All fields are required"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "Admin access required"
          },

          500: {
            description: "Something went wrong"
          }
        }
      },


      get: {
        tags: ["Products"],
        summary: "Get products",
        description: "Get products with category filtering, price filtering, sorting and pagination.",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [

          {
            name: "category",
            in: "query",
            required: false,
            description: "Filter products by category",
            schema: {
              type: "string"
            },
            example: "Electronics"
          },

          {
            name: "minPrice",
            in: "query",
            required: false,
            description: "Minimum product price",
            schema: {
              type: "number"
            },
            example: 1000
          },

          {
            name: "maxPrice",
            in: "query",
            required: false,
            description: "Maximum product price",
            schema: {
              type: "number"
            },
            example: 50000
          },

          {
            name: "sort",
            in: "query",
            required: false,
            description: "Sort products",
            schema: {
              type: "string",
              enum: [
                "price_asc",
                "price_desc",
                "newest"
              ]
            },
            example: "price_asc"
          },

          {
            name: "page",
            in: "query",
            required: false,
            description: "Page number",
            schema: {
              type: "integer",
              default: 1,
              minimum: 1
            },
            example: 1
          },

          {
            name: "limit",
            in: "query",
            required: false,
            description: "Number of products per page",
            schema: {
              type: "integer",
              default: 10,
              minimum: 1
            },
            example: 10
          }
        ],

        responses: {
          200: {
            description: "Products fetched successfully",

            content: {
              "application/json": {
                example: {
                  message: "Products fetched successfully",
                  data: []
                }
              }
            }
          },

          401: {
            description: "Unauthorized"
          },

          500: {
            description: "Something went wrong"
          }
        }
      }
    },


    "/api/v1/products/{id}": {

      get: {
        tags: ["Products"],
        summary: "Get product by ID",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "68c123456789abcdef123456"
          }
        ],

        responses: {
          200: {
            description: "Product fetched successfully",

            content: {
              "application/json": {
                example: {
                  message: "Product fetched successfully",
                  data: {
                    _id: "68c123456789abcdef123456",
                    name: "HP Laptop",
                    description: "HP laptop",
                    price: 45000,
                    category: "Electronics",
                    stock: 10,
                    published: true,
                    ownerId: "68c123456789abcdef123456"
                  }
                }
              }
            }
          },

          400: {
            description: "Invalid product ID"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "You can access only your own products"
          },

          404: {
            description: "Product not found"
          },

          500: {
            description: "Something went wrong"
          }
        }
      },


      put: {
        tags: ["Products"],
        summary: "Update product",
        description: "Update an existing product. Admin can update only their own product.",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "68c123456789abcdef123456"
          }
        ],

        requestBody: {
          required: true,

          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductRequest"
              }
            }
          }
        },

        responses: {
          200: {
            description: "Product updated successfully"
          },

          400: {
            description: "Invalid product ID"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "You can update only your own product"
          },

          404: {
            description: "Product not found"
          },

          500: {
            description: "Something went wrong"
          }
        }
      },


      delete: {
        tags: ["Products"],
        summary: "Delete product",
        description: "Delete a product. Admin can delete only their own product.",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "68c123456789abcdef123456"
          }
        ],

        responses: {
          200: {
            description: "Product deleted successfully"
          },

          400: {
            description: "Invalid product ID"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "You can delete only your own product"
          },

          404: {
            description: "Product not found"
          },

          500: {
            description: "Something went wrong"
          }
        }
      }
    },


    // =====================================================
    // PUBLISH / UNPUBLISH
    // =====================================================

    "/api/v1/products/{id}/publish": {

      patch: {
        tags: ["Products"],
        summary: "Publish product",
        description: "Publish your own product.",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "68c123456789abcdef123456"
          }
        ],

        responses: {
          200: {
            description: "Product published successfully"
          },

          400: {
            description: "Invalid product ID"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "You can publish only your own product"
          },

          404: {
            description: "Product not found"
          },

          500: {
            description: "Something went wrong"
          }
        }
      }
    },


    "/api/v1/products/{id}/unpublish": {

      patch: {
        tags: ["Products"],
        summary: "Unpublish product",
        description: "Unpublish your own product.",

        security: [
          {
            bearerAuth: []
          }
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,

            schema: {
              type: "string"
            },

            example: "68c123456789abcdef123456"
          }
        ],

        responses: {
          200: {
            description: "Product unpublished successfully"
          },

          400: {
            description: "Invalid product ID"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "You can unpublish only your own product"
          },

          404: {
            description: "Product not found"
          },

          500: {
            description: "Something went wrong"
          }
        }
      }
    },


    // =====================================================
    // CSV IMPORT
    // =====================================================

    "/api/v1/products/import": {

      post: {
        tags: ["CSV"],
        summary: "Import products from CSV",
        description: "Upload a CSV file containing product records. Admin only.",

        security: [
          {
            bearerAuth: []
          }
        ],

        requestBody: {
          required: true,

          content: {
            "multipart/form-data": {

              schema: {
                type: "object",

                required: ["file"],

                properties: {
                  file: {
                    type: "string",
                    format: "binary",
                    description: "CSV file"
                  }
                }
              }
            }
          }
        },

        responses: {
          201: {
            description: "Products imported successfully",

            content: {
              "application/json": {
                example: {
                  message: "Products imported successfully",
                  insertedCount: 5,
                  rejectedCount: 1,
                  invalidRecords: []
                }
              }
            }
          },

          400: {
            description: "CSV file missing, empty, or invalid records"
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "Admin access required"
          },

          500: {
            description: "Failed to import CSV"
          }
        }
      }
    },


    // =====================================================
    // CSV EXPORT
    // =====================================================

    "/api/v1/products/export": {

      get: {
        tags: ["CSV"],
        summary: "Export products to CSV",
        description: "Download all products as a CSV file. Admin only.",

        security: [
          {
            bearerAuth: []
          }
        ],

        responses: {
          200: {
            description: "CSV file containing products",

            content: {
              "text/csv": {
                schema: {
                  type: "string"
                },

                example:
                  "name,description,price,category,stock,published\n" +
                  "HP Laptop,HP laptop,45000,Electronics,10,true\n"
              }
            }
          },

          401: {
            description: "Unauthorized"
          },

          403: {
            description: "Admin access required"
          },

          500: {
            description: "Failed to export CSV"
          }
        }
      }
    }
  }
};

export default swaggerSpec;