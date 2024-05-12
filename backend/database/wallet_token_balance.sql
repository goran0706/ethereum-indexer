-- Table: public.wallet_token_balance

-- DROP TABLE IF EXISTS public.wallet_token_balance;

CREATE TABLE IF NOT EXISTS public.wallet_token_balance
(
    id integer NOT NULL DEFAULT nextval('wallet_token_balance_id_seq'::regclass),
    wallet_address character(64) COLLATE pg_catalog."default" NOT NULL,
    token_address character(64) COLLATE pg_catalog."default" NOT NULL,
    token_balance text COLLATE pg_catalog."default",
    token_value_usd money DEFAULT 0,
    block_number bigint DEFAULT 0,
    "timestamp" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT wallet_token_balance_pkey PRIMARY KEY (id),
    CONSTRAINT unique_wallet_token_address_balance_block UNIQUE (wallet_address, token_address, token_balance, block_number)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.wallet_token_balance OWNER to postgres;

SELECT id, wallet_address, token_address, token_balance, token_value_usd, block_number, "timestamp" FROM public.wallet_token_balance;
INSERT INTO public.wallet_token_balance(id, wallet_address, token_address, token_balance, token_value_usd, block_number, "timestamp") VALUES (?, ?, ?, ?, ?, ?, ?);
UPDATE public.wallet_token_balance SET id=?, wallet_address=?, token_address=?, token_balance=?, token_value_usd=?, block_number=?, "timestamp"=? WHERE <condition>;
DELETE FROM public.wallet_token_balance WHERE <condition>;
