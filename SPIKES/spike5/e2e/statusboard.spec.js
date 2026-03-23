const { test, expect } = require('@playwright/test');

// Test 1: Check the page loads with the correct heading
test('page loads with a heading', async ({ page }) => {
  await page.goto('/'); // Navigate to localhost:3000
  // Find an <h1> element with the text 'Player Status Board' and assert it's visible
  await expect(page.getByRole('heading', { name: 'Player Status Board' })).toBeVisible();
});

// Test 2: Check that entering a name and clicking Ready shows the player on the board
test('player appears on board after entering name and setting status', async ({ page }) => {
  await page.goto('/');
  // Find the input by its placeholder text and type a name
  await page.getByPlaceholder('Your name').fill('Youssef');
  // Find the Ready button by its label and click it
  await page.getByRole('button', { name: 'Ready' }).click();
  // Assert that 'Youssef --- Ready' appears somewhere on the page
  await expect(page.getByText('Youssef --- Ready')).toBeVisible();
});
