/*
  # Add Presave Links to Releases

  1. Changes
    - Add `presave_link` column to `releases` table
    - This allows users to presave/pre-add releases before they're available

  2. Notes
    - Column is nullable as not all releases may have presave options
    - Existing releases will have NULL values initially
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'releases' AND column_name = 'presave_link'
  ) THEN
    ALTER TABLE releases ADD COLUMN presave_link text;
  END IF;
END $$;