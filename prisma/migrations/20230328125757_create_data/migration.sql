DO $$
DECLARE
  i INTEGER;
  j INTEGER;
BEGIN
  FOR i IN 1..15 LOOP
    INSERT INTO "Account" (name) VALUES ('Account ' || i);
    FOR j IN 1..floor(random()*5)+1 LOOP
      INSERT INTO "Wallet" (account_id, crypto_asset, crypto_balance, reference_currency) VALUES (
        i,
        CASE floor(random()*13)+1
          WHEN 1 THEN 'BTC'
          WHEN 2 THEN 'ETH'
          WHEN 3 THEN 'ADA'
          WHEN 4 THEN 'BNB'
          WHEN 5 THEN 'DOGE'
          WHEN 6 THEN 'DOT'
          WHEN 7 THEN 'XRP'
          WHEN 8 THEN 'BCH'
          WHEN 9 THEN 'LTC'
          WHEN 10 THEN 'LINK'
          WHEN 11 THEN 'UNI'
          WHEN 12 THEN 'MATIC'
          ELSE 'SOL'
        END,
        floor(random() * 10000 + 1)::float,
        CASE floor(random()*3)+1
          WHEN 1 THEN 'USD'
          WHEN 2 THEN 'EUR'
          ELSE 'GBP'
        END
      );
    END LOOP;
  END LOOP;
END $$;