--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE educational_toys;




--
-- Drop roles
--

DROP ROLE postgres;


--
-- Roles
--

CREATE ROLE postgres;
ALTER ROLE postgres WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:BDiLUt5vDzn01B9qtwpyvw==$+AvZylgNH8FZ8R5vL8WCnx14OMDTFUSJqOtKlLCCb1w=:O1HsUISEU1Vbg8OH9mcYmlbI+dx2sQt/3wT64pjMmoY=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO postgres;

\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: postgres
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: postgres
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "educational_toys" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: educational_toys; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE educational_toys WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE educational_toys OWNER TO postgres;

\connect educational_toys

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cart_items (
    id integer NOT NULL,
    cart_id integer NOT NULL,
    toy_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    rental_duration character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.cart_items OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cart_items_id_seq OWNER TO postgres;

--
-- Name: cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;


--
-- Name: carts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.carts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.carts OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.carts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carts_id_seq OWNER TO postgres;

--
-- Name: carts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.carts_id_seq OWNED BY public.carts.id;


--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255),
    parent_id bigint,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone,
    image_url character varying(255)
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: chats; Type: TABLE; Schema: public; Owner: postgres
--


CREATE TABLE message (
    id integer NOT NULL,
    sender_id integer NOT NULL,
    receiver_id integer NOT NULL,
    message text NOT NULL,
--     read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE message OWNER TO postgres;

--
-- Name: chats_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.chats_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.chats_id_seq OWNER TO postgres;

--
-- Name: chats_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.chats_id_seq OWNED BY public.chats.id;


--
-- Name: discount_toys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discount_toys (
    id integer NOT NULL,
    discount_id integer NOT NULL,
    toy_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.discount_toys OWNER TO postgres;

--
-- Name: discount_toys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discount_toys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discount_toys_id_seq OWNER TO postgres;

--
-- Name: discount_toys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discount_toys_id_seq OWNED BY public.discount_toys.id;


--
-- Name: discounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.discounts (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    discount_code character varying(50) NOT NULL,
    discount_amount numeric(10,2) NOT NULL,
    description text,
    expires_at timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.discounts OWNER TO postgres;

--
-- Name: discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.discounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.discounts_id_seq OWNER TO postgres;

--
-- Name: discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.discounts_id_seq OWNED BY public.discounts.id;


--
-- Name: global_discounts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.global_discounts (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    discount_code character varying(50) NOT NULL,
    discount_amount numeric(10,2) NOT NULL,
    description text,
    expires_at timestamp without time zone,
    condition_type character varying(50) NOT NULL,
    condition_value numeric(10,2),
    max_discount_amount numeric(10,2),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.global_discounts OWNER TO postgres;

--
-- Name: global_discounts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.global_discounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.global_discounts_id_seq OWNER TO postgres;

--
-- Name: global_discounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.global_discounts_id_seq OWNED BY public.global_discounts.id;


--
-- Name: guest_cart_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guest_cart_items (
    id integer NOT NULL,
    session_id character varying(255) NOT NULL,
    toy_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    rental_duration character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.guest_cart_items OWNER TO postgres;

--
-- Name: guest_cart_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.guest_cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.guest_cart_items_id_seq OWNER TO postgres;

--
-- Name: guest_cart_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.guest_cart_items_id_seq OWNED BY public.guest_cart_items.id;


--
-- Name: guest_order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guest_order_items (
    id integer NOT NULL,
    guest_order_id integer NOT NULL,
    toy_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    price numeric(10,2) NOT NULL,
    rental_duration character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.guest_order_items OWNER TO postgres;

--
-- Name: guest_order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.guest_order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.guest_order_items_id_seq OWNER TO postgres;

--
-- Name: guest_order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.guest_order_items_id_seq OWNED BY public.guest_order_items.id;


--
-- Name: guest_orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.guest_orders (
    id integer NOT NULL,
    session_id character varying(255) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    shipping_address text NOT NULL,
    billing_address text,
    status character varying(50) DEFAULT 'pending'::character varying NOT NULL,
    total_price numeric(10,2) NOT NULL,
    order_type character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.guest_orders OWNER TO postgres;

--
-- Name: guest_orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.guest_orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.guest_orders_id_seq OWNER TO postgres;

--
-- Name: guest_orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.guest_orders_id_seq OWNED BY public.guest_orders.id;


--
-- Name: inventory_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory_logs (
    id integer NOT NULL,
    toy_id integer NOT NULL,
    change integer NOT NULL,
    reason character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.inventory_logs OWNER TO postgres;

--
-- Name: inventory_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.inventory_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.inventory_logs_id_seq OWNER TO postgres;

--
-- Name: inventory_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.inventory_logs_id_seq OWNED BY public.inventory_logs.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    order_id integer NOT NULL,
    toy_id integer NOT NULL,
    quantity integer DEFAULT 1 NOT NULL,
    price numeric(10,2) NOT NULL,
    rental_duration character varying(20),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_items_id_seq OWNER TO postgres;

--
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_items.id;


--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    user_id integer NOT NULL,
    status character varying(50) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    order_type character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.orders_id_seq OWNER TO postgres;

--
-- Name: orders_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.id;


--
-- Name: rental_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rental_requests (
    id integer NOT NULL,
    user_id integer NOT NULL,
    toy_id integer NOT NULL,
    rental_duration character varying(20) NOT NULL
);


ALTER TABLE public.rental_requests OWNER TO postgres;

--
-- Name: rental_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rental_requests_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rental_requests_id_seq OWNER TO postgres;

--
-- Name: rental_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rental_requests_id_seq OWNED BY public.rental_requests.id;


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer NOT NULL,
    toy_id integer NOT NULL,
    rating integer NOT NULL,
    comment text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- Name: rewards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rewards (
    id integer NOT NULL,
    user_id integer NOT NULL,
    points integer NOT NULL,
    action character varying(50) NOT NULL,
    description character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.rewards OWNER TO postgres;

--
-- Name: rewards_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rewards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rewards_id_seq OWNER TO postgres;

--
-- Name: rewards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rewards_id_seq OWNED BY public.rewards.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_id_seq OWNER TO postgres;

--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: support_tickets; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.support_tickets (
    id integer NOT NULL,
    user_id integer NOT NULL,
    subject character varying(255) NOT NULL,
    description text NOT NULL,
    status character varying(50) DEFAULT 'open'::character varying NOT NULL,
    priority character varying(20) DEFAULT 'normal'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.support_tickets OWNER TO postgres;

--
-- Name: support_tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.support_tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.support_tickets_id_seq OWNER TO postgres;

--
-- Name: support_tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.support_tickets_id_seq OWNED BY public.support_tickets.id;


--
-- Name: toy_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.toy_categories (
    id integer NOT NULL,
    toy_id bigint NOT NULL,
    category_id bigint NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.toy_categories OWNER TO postgres;

--
-- Name: toy_categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.toy_categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.toy_categories_id_seq OWNER TO postgres;

--
-- Name: toy_categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.toy_categories_id_seq OWNED BY public.toy_categories.id;


--
-- Name: toy_images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.toy_images (
    id integer NOT NULL,
    toy_id bigint NOT NULL,
    image_url character varying(255) NOT NULL,
    is_primary boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.toy_images OWNER TO postgres;

--
-- Name: toy_images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.toy_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.toy_images_id_seq OWNER TO postgres;

--
-- Name: toy_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.toy_images_id_seq OWNED BY public.toy_images.id;


--
-- Name: toys; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.toys (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    description character varying(255),
    age_range character varying(255),
    price double precision NOT NULL,
    rental_price_day numeric(10,2),
    rental_price_week numeric(10,2),
    rental_price_two_weeks numeric(10,2),
    stock integer NOT NULL,
    available_for_rent boolean DEFAULT true,
    available_for_sale boolean DEFAULT true,
    manufacturer character varying(255) NOT NULL,
    supplier_id bigint,
    weight double precision,
    material character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    deleted_at timestamp without time zone
);


ALTER TABLE public.toys OWNER TO postgres;

--
-- Name: toys_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.toys_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.toys_id_seq OWNER TO postgres;

--
-- Name: toys_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.toys_id_seq OWNED BY public.toys.id;


--
-- Name: tracking_info; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tracking_info (
    id integer NOT NULL,
    guest_order_id integer,
    user_order_id integer,
    tracking_number character varying(100) NOT NULL,
    carrier character varying(100) NOT NULL,
    status character varying(50) NOT NULL,
    estimated_delivery timestamp without time zone,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.tracking_info OWNER TO postgres;

--
-- Name: tracking_info_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tracking_info_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tracking_info_id_seq OWNER TO postgres;

--
-- Name: tracking_info_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tracking_info_id_seq OWNED BY public.tracking_info.id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions (
    id integer NOT NULL,
    user_id integer NOT NULL,
    order_id integer,
    amount numeric(10,2) NOT NULL,
    transaction_type character varying(50) NOT NULL,
    status character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.transactions OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_id_seq OWNER TO postgres;

--
-- Name: transactions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_id_seq OWNED BY public.transactions.id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    reward_points integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);


--
-- Name: carts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts ALTER COLUMN id SET DEFAULT nextval('public.carts_id_seq'::regclass);


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: chats id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats ALTER COLUMN id SET DEFAULT nextval('public.chats_id_seq'::regclass);


--
-- Name: discount_toys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount_toys ALTER COLUMN id SET DEFAULT nextval('public.discount_toys_id_seq'::regclass);


--
-- Name: discounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts ALTER COLUMN id SET DEFAULT nextval('public.discounts_id_seq'::regclass);


--
-- Name: global_discounts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.global_discounts ALTER COLUMN id SET DEFAULT nextval('public.global_discounts_id_seq'::regclass);


--
-- Name: guest_cart_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_cart_items ALTER COLUMN id SET DEFAULT nextval('public.guest_cart_items_id_seq'::regclass);


--
-- Name: guest_order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_order_items ALTER COLUMN id SET DEFAULT nextval('public.guest_order_items_id_seq'::regclass);


--
-- Name: guest_orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_orders ALTER COLUMN id SET DEFAULT nextval('public.guest_orders_id_seq'::regclass);


--
-- Name: inventory_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_logs ALTER COLUMN id SET DEFAULT nextval('public.inventory_logs_id_seq'::regclass);


--
-- Name: order_items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- Name: orders id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN id SET DEFAULT nextval('public.orders_id_seq'::regclass);


--
-- Name: rental_requests id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_requests ALTER COLUMN id SET DEFAULT nextval('public.rental_requests_id_seq'::regclass);


--
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- Name: rewards id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards ALTER COLUMN id SET DEFAULT nextval('public.rewards_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: support_tickets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_tickets ALTER COLUMN id SET DEFAULT nextval('public.support_tickets_id_seq'::regclass);


--
-- Name: toy_categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toy_categories ALTER COLUMN id SET DEFAULT nextval('public.toy_categories_id_seq'::regclass);


--
-- Name: toy_images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toy_images ALTER COLUMN id SET DEFAULT nextval('public.toy_images_id_seq'::regclass);


--
-- Name: toys id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toys ALTER COLUMN id SET DEFAULT nextval('public.toys_id_seq'::regclass);


--
-- Name: tracking_info id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracking_info ALTER COLUMN id SET DEFAULT nextval('public.tracking_info_id_seq'::regclass);


--
-- Name: transactions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions ALTER COLUMN id SET DEFAULT nextval('public.transactions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cart_items (id, cart_id, toy_id, quantity, rental_duration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.carts (id, user_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (id, name, description, parent_id, created_at, updated_at, deleted_at, image_url) FROM stdin;
1	Educational Toys	Toys designed to enhance learning and development.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
2	STEM Toys	Toys that focus on Science, Technology, Engineering, and Mathematics.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
3	Art & Craft	Toys that encourage creativity and artistic expression.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
4	Outdoor Play	Toys designed for outdoor activities and physical development.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
5	Music & Instruments	Toys that teach music and rhythm.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
6	Building & Construction	Toys for building and construction skills.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
7	Puzzles	Puzzles designed to develop problem-solving skills.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
8	Role Play	Toys that encourage imaginative play and role-playing.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
9	Board Games	Games designed for family and group interaction.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
10	Books	Educational books for children.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
11	Robotics	Toys for learning robotics and coding.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
12	Coding Toys	Toys that teach coding and programming skills.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
13	Science Kits	Kits for conducting science experiments.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
14	Math Games	Games designed to improve mathematical skills.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
15	Engineering Kits	Kits that encourage engineering concepts and building.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
16	Technology Toys	Interactive technology-based educational toys.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
17	Painting & Drawing	Toys and supplies for painting and drawing.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
18	Craft Kits	Kits that include supplies for various arts and crafts.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
19	Clay & Sculpting	Toys for creating sculptures with clay.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
20	Jewelry Making	Toys for creating jewelry and fashion accessories.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
21	Coloring Books	Books designed for coloring and artistic creativity.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
22	Sticker Art	Toys for creating art with stickers.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
23	Sports Equipment	Toys designed for outdoor sports activities.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
24	Ride-On Toys	Toys for riding and physical development.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
25	Water Toys	Toys designed for water play.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
26	Gardening Toys	Toys that teach gardening skills.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
27	Climbing Toys	Toys designed for climbing and improving motor skills.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
28	Swing Sets	Swings and playsets for outdoor fun.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
29	Percussion	Toys that focus on percussion instruments like drums.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
30	String Instruments	Toys that introduce string instruments like guitars.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
31	Wind Instruments	Toys that teach wind instruments like flutes.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
32	Keyboard Instruments	Toys like mini keyboards and pianos.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
33	Musical Games	Games that focus on rhythm and musical interaction.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
34	Music Kits	Complete kits for creating music and learning instruments.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
35	Building Blocks	Blocks that children can use to build structures.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
36	Magnetic Tiles	Magnetic building tiles for creating shapes and structures.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
37	Wooden Building Sets	Wooden toys for constructing various objects.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
38	Engineering Construction Kits	Construction kits that teach engineering concepts.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
39	Creative Building Sets	Sets that encourage creative and open-ended construction.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
40	Vehicle Construction Kits	Kits to build cars, trucks, and other vehicles.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
41	Jigsaw Puzzles	Classic jigsaw puzzles for kids of all ages.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
42	3D Puzzles	Puzzles that form 3D structures.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
43	Puzzle Games	Interactive puzzle games to boost problem-solving skills.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
44	Logic Puzzles	Puzzles designed to improve logical thinking.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
45	Maze Puzzles	Puzzles that involve navigating mazes.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
46	Pattern Puzzles	Puzzles that focus on identifying and completing patterns.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
47	Dollhouses	Miniature houses for dolls to encourage imaginative play.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
48	Costumes & Dress Up	Costumes for children to dress up and role-play.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
49	Doctor Kits	Kits that allow children to role-play as doctors.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
50	Cooking & Kitchen Sets	Toys that simulate kitchen and cooking activities.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
51	Tool Sets	Toy tools for pretend building and fixing.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
52	Pretend Play Sets	Complete pretend play sets for different scenarios.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
53	Classic Board Games	Classic board games for families and children.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
54	Strategy Games	Board games that focus on strategy and critical thinking.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
55	Card Games	Educational card games for children.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
56	Cooperative Games	Games that focus on teamwork and cooperation.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
57	Dice Games	Games that use dice for learning and interaction.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
58	Educational Board Games	Games that combine learning with fun board game play.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
59	Picture Books	Books with vibrant illustrations for young readers.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
60	Early Learning Books	Books designed for preschool learning.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
61	Science Books	Books that introduce basic science concepts.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
62	Math Books	Books focused on improving math skills.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
63	History Books	Books that introduce children to history and historical events.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
64	Interactive Books	Books with interactive elements like flaps and sound.	\N	2024-10-18 17:39:26.543044	2024-10-18 17:39:26.543044	\N	\N
85	test_update	\N	\N	2024-10-28 15:46:52.661547	2024-10-28 15:46:52.661549	\N	\N
\.


--
-- Data for Name: chats; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chats (id, sender_id, receiver_id, message, read, created_at) FROM stdin;
\.


--
-- Data for Name: discount_toys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discount_toys (id, discount_id, toy_id, created_at) FROM stdin;
\.


--
-- Data for Name: discounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.discounts (id, name, discount_code, discount_amount, description, expires_at, created_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: global_discounts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.global_discounts (id, name, discount_code, discount_amount, description, expires_at, condition_type, condition_value, max_discount_amount, created_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: guest_cart_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.guest_cart_items (id, session_id, toy_id, quantity, rental_duration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: guest_order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.guest_order_items (id, guest_order_id, toy_id, quantity, price, rental_duration, created_at) FROM stdin;
\.


--
-- Data for Name: guest_orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.guest_orders (id, session_id, name, email, phone, shipping_address, billing_address, status, total_price, order_type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: inventory_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory_logs (id, toy_id, change, reason, created_at) FROM stdin;
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, order_id, toy_id, quantity, price, rental_duration, created_at) FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, user_id, status, total_price, order_type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: rental_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rental_requests (id, user_id, toy_id, rental_duration) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id, user_id, toy_id, rating, comment, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rewards (id, user_id, points, action, description, created_at) FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (id, name) FROM stdin;
1	USER
2	SUPPLIER
3	ADMIN
\.


--
-- Data for Name: support_tickets; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.support_tickets (id, user_id, subject, description, status, priority, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: toy_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.toy_categories (id, toy_id, category_id, created_at) FROM stdin;
\.


--
-- Data for Name: toy_images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.toy_images (id, toy_id, image_url, is_primary, created_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: toys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.toys (id, name, description, age_range, price, rental_price_day, rental_price_week, rental_price_two_weeks, stock, available_for_rent, available_for_sale, manufacturer, supplier_id, weight, material, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: tracking_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tracking_info (id, guest_order_id, user_order_id, tracking_number, carrier, status, estimated_delivery, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions (id, user_id, order_id, amount, transaction_type, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id) FROM stdin;
2	1
2	3
3	1
5	1
6	1
6	3
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, reward_points, created_at, updated_at) FROM stdin;
2	test	test@gmail.com	$2a$10$TFpsFnJi8cpBPhbcdlRtAudYdKKSC3dIz0EmUCB48snSUwm0YuG4C	0	\N	\N
3	test	test1@gmail.com	$2a$10$U04LxhitnRkHN.7UvIgw3utKOwJXnr1HbsqTDsn0e00JYMm.O12y2	0	2024-10-28 09:11:12.096147	2024-10-28 09:11:12.096148
5	test	test2@gmail.com	$2a$10$Zu2wDLww2qxg1w54pRiOROYUYNw2kbbwxwy5ds12TM.YH4grQZc86	0	2024-10-28 09:56:46.384968	2024-10-28 09:56:46.384969
6	test	test3@gmail.com	$2a$10$XNRz/Gk49MXhxbN77OQcaObcfzf0jbrdrnMbryzjf1/9346N9/v4S	0	2024-10-28 10:07:10.485291	2024-10-28 10:07:10.485291
\.


--
-- Name: cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cart_items_id_seq', 1, false);


--
-- Name: carts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.carts_id_seq', 1, false);


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 85, true);


--
-- Name: chats_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.chats_id_seq', 1, false);


--
-- Name: discount_toys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discount_toys_id_seq', 1, false);


--
-- Name: discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.discounts_id_seq', 1, false);


--
-- Name: global_discounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.global_discounts_id_seq', 1, false);


--
-- Name: guest_cart_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.guest_cart_items_id_seq', 1, false);


--
-- Name: guest_order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.guest_order_items_id_seq', 1, false);


--
-- Name: guest_orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.guest_orders_id_seq', 1, false);


--
-- Name: inventory_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.inventory_logs_id_seq', 1, false);


--
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- Name: rental_requests_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rental_requests_id_seq', 1, false);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 1, false);


--
-- Name: rewards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rewards_id_seq', 1, false);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_id_seq', 3, true);


--
-- Name: support_tickets_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.support_tickets_id_seq', 1, false);


--
-- Name: toy_categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.toy_categories_id_seq', 1, false);


--
-- Name: toy_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.toy_images_id_seq', 1, false);


--
-- Name: toys_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.toys_id_seq', 1, false);


--
-- Name: tracking_info_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tracking_info_id_seq', 1, false);


--
-- Name: transactions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: cart_items cart_items_cart_id_toy_id_rental_duration_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_toy_id_rental_duration_key UNIQUE (cart_id, toy_id, rental_duration);


--
-- Name: cart_items cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY (id);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: chats chats_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_pkey PRIMARY KEY (id);


--
-- Name: discount_toys discount_toys_discount_id_toy_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount_toys
    ADD CONSTRAINT discount_toys_discount_id_toy_id_key UNIQUE (discount_id, toy_id);


--
-- Name: discount_toys discount_toys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount_toys
    ADD CONSTRAINT discount_toys_pkey PRIMARY KEY (id);


--
-- Name: discounts discounts_discount_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_discount_code_key UNIQUE (discount_code);


--
-- Name: discounts discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discounts
    ADD CONSTRAINT discounts_pkey PRIMARY KEY (id);


--
-- Name: global_discounts global_discounts_discount_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.global_discounts
    ADD CONSTRAINT global_discounts_discount_code_key UNIQUE (discount_code);


--
-- Name: global_discounts global_discounts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.global_discounts
    ADD CONSTRAINT global_discounts_pkey PRIMARY KEY (id);


--
-- Name: guest_cart_items guest_cart_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_cart_items
    ADD CONSTRAINT guest_cart_items_pkey PRIMARY KEY (id);


--
-- Name: guest_cart_items guest_cart_items_session_id_toy_id_rental_duration_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_cart_items
    ADD CONSTRAINT guest_cart_items_session_id_toy_id_rental_duration_key UNIQUE (session_id, toy_id, rental_duration);


--
-- Name: guest_order_items guest_order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_order_items
    ADD CONSTRAINT guest_order_items_pkey PRIMARY KEY (id);


--
-- Name: guest_orders guest_orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_orders
    ADD CONSTRAINT guest_orders_pkey PRIMARY KEY (id);


--
-- Name: guest_orders guest_orders_session_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_orders
    ADD CONSTRAINT guest_orders_session_id_key UNIQUE (session_id);


--
-- Name: inventory_logs inventory_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_logs
    ADD CONSTRAINT inventory_logs_pkey PRIMARY KEY (id);


--
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- Name: rental_requests rental_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_requests
    ADD CONSTRAINT rental_requests_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: rewards rewards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id);


--
-- Name: support_tickets support_tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_pkey PRIMARY KEY (id);


--
-- Name: toy_categories toy_categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toy_categories
    ADD CONSTRAINT toy_categories_pkey PRIMARY KEY (id);


--
-- Name: toy_categories toy_categories_toy_id_category_id_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toy_categories
    ADD CONSTRAINT toy_categories_toy_id_category_id_key UNIQUE (toy_id, category_id);


--
-- Name: toy_images toy_images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toy_images
    ADD CONSTRAINT toy_images_pkey PRIMARY KEY (id);


--
-- Name: toys toys_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toys
    ADD CONSTRAINT toys_pkey PRIMARY KEY (id);


--
-- Name: tracking_info tracking_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracking_info
    ADD CONSTRAINT tracking_info_pkey PRIMARY KEY (id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: cart_items cart_items_cart_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_cart_id_fkey FOREIGN KEY (cart_id) REFERENCES public.carts(id);


--
-- Name: cart_items cart_items_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: carts carts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: categories categories_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.categories(id);


--
-- Name: chats chats_receiver_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES public.users(id);


--
-- Name: chats chats_sender_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chats
    ADD CONSTRAINT chats_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id);


--
-- Name: discount_toys discount_toys_discount_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount_toys
    ADD CONSTRAINT discount_toys_discount_id_fkey FOREIGN KEY (discount_id) REFERENCES public.discounts(id);


--
-- Name: discount_toys discount_toys_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.discount_toys
    ADD CONSTRAINT discount_toys_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: categories fk_parent; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT fk_parent FOREIGN KEY (parent_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- Name: guest_cart_items guest_cart_items_session_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_cart_items
    ADD CONSTRAINT guest_cart_items_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.guest_orders(session_id);


--
-- Name: guest_cart_items guest_cart_items_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_cart_items
    ADD CONSTRAINT guest_cart_items_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: guest_order_items guest_order_items_guest_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_order_items
    ADD CONSTRAINT guest_order_items_guest_order_id_fkey FOREIGN KEY (guest_order_id) REFERENCES public.guest_orders(id);


--
-- Name: guest_order_items guest_order_items_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.guest_order_items
    ADD CONSTRAINT guest_order_items_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: inventory_logs inventory_logs_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory_logs
    ADD CONSTRAINT inventory_logs_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: order_items order_items_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: order_items order_items_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: orders orders_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: rental_requests rental_requests_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_requests
    ADD CONSTRAINT rental_requests_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: rental_requests rental_requests_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rental_requests
    ADD CONSTRAINT rental_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: reviews reviews_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: rewards rewards_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: support_tickets support_tickets_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.support_tickets
    ADD CONSTRAINT support_tickets_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: toy_categories toy_categories_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toy_categories
    ADD CONSTRAINT toy_categories_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- Name: toy_categories toy_categories_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toy_categories
    ADD CONSTRAINT toy_categories_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: toy_images toy_images_toy_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toy_images
    ADD CONSTRAINT toy_images_toy_id_fkey FOREIGN KEY (toy_id) REFERENCES public.toys(id);


--
-- Name: toys toys_supplier_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.toys
    ADD CONSTRAINT toys_supplier_id_fkey FOREIGN KEY (supplier_id) REFERENCES public.users(id);


--
-- Name: tracking_info tracking_info_guest_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracking_info
    ADD CONSTRAINT tracking_info_guest_order_id_fkey FOREIGN KEY (guest_order_id) REFERENCES public.guest_orders(id);


--
-- Name: tracking_info tracking_info_user_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tracking_info
    ADD CONSTRAINT tracking_info_user_order_id_fkey FOREIGN KEY (user_order_id) REFERENCES public.orders(id);


--
-- Name: transactions transactions_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_order_id_fkey FOREIGN KEY (order_id) REFERENCES public.orders(id);


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(id);


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO postgres;

\connect postgres

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

