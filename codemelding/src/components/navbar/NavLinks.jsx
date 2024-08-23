export const navbarLinks = [
    { name: 'Home', to: '/' },
    {
      name: 'Services',
      to: '#', // Placeholder for dropdown
      dropdown: [
        { name: 'Service 1', to: '/service1' },
        { name: 'Service 2', to: '/service2' },
        { name: 'Service 3', to: '/service3' }
      ]
    },
    { name: 'Solution', to: '/about' },
    { name: 'Technolgies', to: '/about' },
    { name: 'Company', to: '/contact' }
  ];