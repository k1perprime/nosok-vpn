import { render, screen } from '@testing-library/react';
import HomeRoute from '@/app/page';
import AccountRoute from '@/app/account/page';

describe('route shells', () => {
  it('names both approved routes', () => {
    const { rerender } = render(<HomeRoute />);
    expect(screen.getByRole('heading', { name: /Nosok VPN/i })).toBeInTheDocument();
    rerender(<AccountRoute />);
    expect(screen.getByRole('heading', { name: /Личный кабинет/i })).toBeInTheDocument();
  });

  it('keeps a small knitted sock mark beside the public brand name', () => {
    render(<HomeRoute />);

    const brand = screen.getByRole('link', { name: 'Nosok VPN' });
    expect(brand.querySelector('img')).toHaveAttribute(
      'src',
      '/images/nosok-header-icon.png',
    );
    expect(brand.querySelector('img')).toHaveAttribute('alt', '');
  });
});
