# Module 9 Ultraverse Parity Audit

## Scope

This audit compares the publicly exposed Ultraverse application bundle at https://nft-marketplacee.web.app/ with the standalone Nexa course-spec implementation. The deployed reference exposes compiled React JavaScript, compiled CSS, and static media; it does not expose the original private source repository. The comparison therefore covers all observable classes, attributes, tokens, breakpoints, and browser behavior that can be verified from the public application.

## Animation parity

The reference uses the WOW animation system. Its bundle exposes `wow` plus `fadeIn`, `fadeInUp`, and `fadeInRight` triggers, and its CSS sets `.animated` to a one-second duration with both fill-mode and the corresponding keyframes. The reference hero sequence is: eyebrow `fadeInUp` at `.5s`, headline `fadeInUp` at `.75s`, description `fadeInUp` at `1s`, Explore CTA `fadeInUp` at `1.25s`, and hero image `fadeIn` at `1.25s`. The category tiles use `fadeInRight` with `.1s` through `.6s` delays. Hot Collections and New Items wrappers use `fadeIn`; the wallet setup cards use `fadeInUp`, with paragraph delays of `.25s`; the author list uses `fadeIn`; and the Load more control uses `fadeInUp`.

Nexa now reproduces the visible trigger sequence through AOS attributes: hero eyebrow 500ms, headline 750ms, description 1000ms, CTA 1250ms, hero art 1250ms, category buttons in 100ms increments, collection cards in 100ms increments, and seller rows in 100ms increments. AOS is configured for a 1000ms duration, `ease` timing, zero offset, and repeat-on-scroll behavior to match the observable WOW defaults. Reduced-motion CSS remains enabled as an accessibility safeguard; that is a deliberate implementation improvement, not a visible mismatch for users who do not request reduced motion.

## Responsive breakpoint parity

The reference bundle includes Bootstrap-style thresholds at 575.98px, 767.98px, 991.98px, 1199.98px, and 1399.98px, along with a 360px edge case. The Nexa implementation now uses the reference-critical 991.98px desktop-to-mobile navigation threshold and 575.98px compact-mobile threshold. Nexa’s two-column marketplace grid collapses to two columns at the tablet range and one column below 575.98px. Its detail view and seller section also collapse at the 991.98px threshold.

## Mobile drawer parity

The reference bundle exposes `#menu-btn`, a body `menu__open` state, a dropdown wrapper, and a close button. Nexa now toggles the same `menu__open` body class from React state. At widths up to 991.98px, navigation is hidden until the menu button opens it, then transitions from a short upward offset into a full-width white drawer with a bottom border and shadow. At widths below 575.98px, the drawer uses the compact 72px header position and tighter padding. Reduced-motion users receive no drawer transition.

## Typography parity

The reference theme declares `--title-font` and `--body-font` as `"DM Sans", Helvetica, Arial, sans-serif`. Its main heading rules use a 700 weight; body copy uses 400; navigation and labels commonly use 600 or 700. Nexa now imports DM Sans weights 400, 500, 600, and 700 and uses DM Sans for all visible headings, logo text, cards, sellers, and detail headings. This removes the former Space Grotesk mismatch.

## Color parity

The reference theme declares `--primary-color: #403f83` and `--secondary-color: #8364e2`, with RGB values `64,63,131` and `131,100,226`. The reference also uses `#0d0c22` for primary headings, `#888` for common muted labels, and white surfaces. Nexa now exposes the same primary, secondary, ink, and muted tokens and uses them for the dominant CTA gradients, eyebrows, heading accents, category states, and page text. Remaining subtle surface and border colors are localized layout treatments rather than unverified claims of source-level identity.

## Validation status

The standalone project passed `pnpm run check` and `pnpm run build` after the parity changes. The next required verification is to publish the rebuilt bundle to the same GitHub Pages URL, then perform desktop/tablet/mobile visual checks and confirm the live bundle contains the new AOS timing, drawer breakpoint, DM Sans import, and reference color tokens.

## References

1. [Ultraverse mentor reference](https://nft-marketplacee.web.app/)
2. [AOS documentation](https://michalsnik.github.io/aos/)
3. [Nexa NFT World live deployment](https://kljj365.github.io/nexa-nft-marketplace-module9/)
