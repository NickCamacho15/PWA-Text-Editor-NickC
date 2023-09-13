const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Handle the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  event.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  // Update UI notify the user they can add to home screen
  butInstall.style.display = 'block';
});

// Handle the button click event for installation
butInstall.addEventListener('click', async () => {
  console.log('👍', 'butInstall-clicked');
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The user hasn't been prompted yet.
    return;
  }
  // Show the install prompt
  promptEvent.prompt();
  // Log the result of the user action.
  const result = await promptEvent.userChoice;
  console.log('👍', 'userChoice', result);
  // Clean up the deferred prompt
  window.deferredPrompt = null;
  // Hide the install button
  butInstall.style.display = 'none';
});

// Handle the appinstalled event
window.addEventListener('appinstalled', (event) => {
  console.log('👍', 'appinstalled', event);
  // Clear the deferredPrompt variable, as it is no longer needed
  window.deferredPrompt = null;
  // Optionally, hide the install button, as it is no longer needed
  butInstall.style.display = 'none';
});
