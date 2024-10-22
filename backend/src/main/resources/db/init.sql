CREATE TABLE "users" (
                         "id" SERIAL PRIMARY KEY,
                         "name" varchar(100) NOT NULL,
                         "email" varchar(100) UNIQUE NOT NULL,
                         "password" varchar(255) NOT NULL,
                         "reward_points" int DEFAULT 0,
                         "created_at" timestamp DEFAULT current_timestamp,
                         "updated_at" timestamp DEFAULT current_timestamp
);


CREATE TABLE "roles" (
                         "id" SERIAL PRIMARY KEY,
                         "name" varchar(50) UNIQUE NOT NULL
);

CREATE TABLE "user_roles" (
                              "user_id" int NOT NULL,
                              "role_id" int NOT NULL,
                              PRIMARY KEY ("user_id", "role_id"),
                              FOREIGN KEY ("user_id") REFERENCES "users" ("id"),
                              FOREIGN KEY ("role_id") REFERENCES "roles" ("id")
);

CREATE TABLE "toys" (
                        "id" SERIAL PRIMARY KEY,
                        "name" varchar(100) NOT NULL,
                        "description" text,
                        "age_range" varchar(50),
                        "price" decimal(10,2) NOT NULL,
                        "rental_price_day" decimal(10,2),
                        "rental_price_week" decimal(10,2),
                        "rental_price_two_weeks" decimal(10,2),
                        "stock" int NOT NULL,
                        "available_for_rent" boolean DEFAULT true,
                        "available_for_sale" boolean DEFAULT true,
                        "manufacturer" varchar(100) NOT NULL,
                        "supplier_id" int,
                        "weight" decimal(10,2),
                        "material" varchar(50) NOT NULL,
                        "created_at" timestamp DEFAULT current_timestamp,
                        "updated_at" timestamp DEFAULT current_timestamp,
                        "deleted_at" timestamp
);

CREATE TABLE "categories" (
                              "id" SERIAL PRIMARY KEY,
                              "name" varchar(100) UNIQUE NOT NULL,
                              "description" varchar(255),
                              "parent_id" int,
                              CONSTRAINT fk_parent FOREIGN KEY(parent_id) REFERENCES categories(id) ON DELETE SET NULL,
                              "created_at" timestamp DEFAULT current_timestamp,
                              "updated_at" timestamp DEFAULT current_timestamp,
                              "deleted_at" timestamp
);

CREATE TABLE "toy_categories" (
                                  "id" SERIAL PRIMARY KEY,
                                  "toy_id" int NOT NULL,
                                  "category_id" int NOT NULL,
                                  "created_at" timestamp DEFAULT current_timestamp,
                                  UNIQUE ("toy_id", "category_id")
);

CREATE TABLE "toy_images" (
                              "id" SERIAL PRIMARY KEY,
                              "toy_id" int NOT NULL,
                              "image_url" varchar(255) NOT NULL,
                              "is_primary" boolean DEFAULT false,
                              "created_at" timestamp DEFAULT current_timestamp,
                              "deleted_at" timestamp
);

CREATE TABLE "carts" (
                         "id" SERIAL PRIMARY KEY,
                         "user_id" int NOT NULL,
                         "created_at" timestamp DEFAULT current_timestamp,
                         "updated_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "cart_items" (
                              "id" SERIAL PRIMARY KEY,
                              "cart_id" int NOT NULL,
                              "toy_id" int NOT NULL,
                              "quantity" int NOT NULL DEFAULT 1,
                              "rental_duration" varchar(20),
                              "created_at" timestamp DEFAULT current_timestamp,
                              "updated_at" timestamp DEFAULT current_timestamp,
                              UNIQUE ("cart_id", "toy_id", "rental_duration")
);

CREATE TABLE "discounts" (
                             "id" SERIAL PRIMARY KEY,
                             "name" varchar(100) NOT NULL,
                             "discount_code" varchar(50) UNIQUE NOT NULL,
                             "discount_amount" decimal(10,2) NOT NULL,
                             "description" text,
                             "expires_at" timestamp,
                             "created_at" timestamp DEFAULT current_timestamp,
                             "deleted_at" timestamp
);

CREATE TABLE "global_discounts" (
                                    "id" SERIAL PRIMARY KEY,
                                    "name" varchar(100) NOT NULL,
                                    "discount_code" varchar(50) UNIQUE NOT NULL,
                                    "discount_amount" decimal(10,2) NOT NULL,
                                    "description" text,
                                    "expires_at" timestamp,
                                    "condition_type" varchar(50) NOT NULL,
                                    "condition_value" decimal(10,2),
                                    "max_discount_amount" decimal(10,2),
                                    "created_at" timestamp DEFAULT current_timestamp,
                                    "deleted_at" timestamp
);

CREATE TABLE "discount_toys" (
                                 "id" SERIAL PRIMARY KEY,
                                 "discount_id" int NOT NULL,
                                 "toy_id" int NOT NULL,
                                 "created_at" timestamp DEFAULT current_timestamp,
                                 UNIQUE ("discount_id", "toy_id")
);

CREATE TABLE "orders" (
                          "id" SERIAL PRIMARY KEY,
                          "user_id" int NOT NULL,
                          "status" varchar(50) NOT NULL,
                          "total_price" decimal(10,2) NOT NULL,
                          "order_type" varchar(20) NOT NULL,
                          "created_at" timestamp DEFAULT current_timestamp,
                          "updated_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "order_items" (
                               "id" SERIAL PRIMARY KEY,
                               "order_id" int NOT NULL,
                               "toy_id" int NOT NULL,
                               "quantity" int NOT NULL DEFAULT 1,
                               "price" decimal(10,2) NOT NULL,
                               "rental_duration" varchar(20),
                               "created_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "guest_orders" (
                                "id" SERIAL PRIMARY KEY,
                                "session_id" varchar(255) UNIQUE NOT NULL,
                                "name" varchar(100) NOT NULL,
                                "email" varchar(100) NOT NULL,
                                "phone" varchar(20) NOT NULL,
                                "shipping_address" text NOT NULL,
                                "billing_address" text,
                                "status" varchar(50) NOT NULL DEFAULT 'pending',
                                "total_price" decimal(10,2) NOT NULL,
                                "order_type" varchar(20) NOT NULL,
                                "created_at" timestamp DEFAULT current_timestamp,
                                "updated_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "guest_cart_items" (
                                    "id" SERIAL PRIMARY KEY,
                                    "session_id" varchar(255) NOT NULL,
                                    "toy_id" int NOT NULL,
                                    "quantity" int NOT NULL DEFAULT 1,
                                    "rental_duration" varchar(20),
                                    "created_at" timestamp DEFAULT current_timestamp,
                                    "updated_at" timestamp DEFAULT current_timestamp,
                                    UNIQUE ("session_id", "toy_id", "rental_duration")
);

CREATE TABLE "guest_order_items" (
                                     "id" SERIAL PRIMARY KEY,
                                     "guest_order_id" int NOT NULL,
                                     "toy_id" int NOT NULL,
                                     "quantity" int NOT NULL DEFAULT 1,
                                     "price" decimal(10,2) NOT NULL,
                                     "rental_duration" varchar(20),
                                     "created_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "tracking_info" (
                                 "id" SERIAL PRIMARY KEY,
                                 "guest_order_id" int,
                                 "user_order_id" int,
                                 "tracking_number" varchar(100) NOT NULL,
                                 "carrier" varchar(100) NOT NULL,
                                 "status" varchar(50) NOT NULL,
                                 "estimated_delivery" timestamp,
                                 "created_at" timestamp DEFAULT current_timestamp,
                                 "updated_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "reviews" (
                           "id" SERIAL PRIMARY KEY,
                           "user_id" int NOT NULL,
                           "toy_id" int NOT NULL,
                           "rating" int NOT NULL,
                           "comment" text,
                           "created_at" timestamp DEFAULT current_timestamp,
                           "updated_at" timestamp DEFAULT current_timestamp,
                           "deleted_at" timestamp
);

CREATE TABLE "chats" (
                         "id" SERIAL PRIMARY KEY,
                         "sender_id" int NOT NULL,
                         "receiver_id" int NOT NULL,
                         "message" text NOT NULL,
                         "read" boolean DEFAULT false,
                         "created_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "support_tickets" (
                                   "id" SERIAL PRIMARY KEY,
                                   "user_id" int NOT NULL,
                                   "subject" varchar(255) NOT NULL,
                                   "description" text NOT NULL,
                                   "status" varchar(50) NOT NULL DEFAULT 'open',
                                   "priority" varchar(20) DEFAULT 'normal',
                                   "created_at" timestamp DEFAULT current_timestamp,
                                   "updated_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "rewards" (
                           "id" SERIAL PRIMARY KEY,
                           "user_id" int NOT NULL,
                           "points" int NOT NULL,
                           "action" varchar(50) NOT NULL,
                           "description" varchar(255),
                           "created_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "transactions" (
                                "id" SERIAL PRIMARY KEY,
                                "user_id" int NOT NULL,
                                "order_id" int,
                                "amount" decimal(10,2) NOT NULL,
                                "transaction_type" varchar(50) NOT NULL,
                                "status" varchar(50) NOT NULL,
                                "created_at" timestamp DEFAULT current_timestamp,
                                "updated_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "inventory_logs" (
                                  "id" SERIAL PRIMARY KEY,
                                  "toy_id" int NOT NULL,
                                  "change" int NOT NULL,
                                  "reason" varchar(255),
                                  "created_at" timestamp DEFAULT current_timestamp
);

CREATE TABLE "rental_requests"
(
    "id"              SERIAL PRIMARY KEY,
    "user_id"         int         NOT NULL,
    "toy_id"          int         NOT NULL,
    "rental_duration" varchar(20) NOT NULL
)



ALTER TABLE "toys" ADD FOREIGN KEY ("supplier_id") REFERENCES "users" ("id");


ALTER TABLE "categories" ADD FOREIGN KEY ("parent_id") REFERENCES "categories" ("id");

ALTER TABLE "toy_categories" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "toy_categories" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id");

ALTER TABLE "toy_images" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id");

ALTER TABLE "cart_items" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "discount_toys" ADD FOREIGN KEY ("discount_id") REFERENCES "discounts" ("id");

ALTER TABLE "discount_toys" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "guest_cart_items" ADD FOREIGN KEY ("session_id") REFERENCES "guest_orders" ("session_id");

ALTER TABLE "guest_cart_items" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "guest_order_items" ADD FOREIGN KEY ("guest_order_id") REFERENCES "guest_orders" ("id");

ALTER TABLE "guest_order_items" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "tracking_info" ADD FOREIGN KEY ("guest_order_id") REFERENCES "guest_orders" ("id");

ALTER TABLE "tracking_info" ADD FOREIGN KEY ("user_order_id") REFERENCES "orders" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "reviews" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "chats" ADD FOREIGN KEY ("sender_id") REFERENCES "users" ("id");

ALTER TABLE "chats" ADD FOREIGN KEY ("receiver_id") REFERENCES "users" ("id");

ALTER TABLE "support_tickets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "rewards" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "transactions" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "inventory_logs" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");

ALTER TABLE "rental_requests" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "rental_requests" ADD FOREIGN KEY ("toy_id") REFERENCES "toys" ("id");