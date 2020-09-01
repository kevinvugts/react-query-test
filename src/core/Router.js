import React from 'react'
import PropTypes from 'prop-types'

// Screens
import CategoriesScreen from '@pages/Categories'
import ArticlesScreen from '@pages/Articles'
import ProfileScreen from '@pages/Profile'
import ChangeEmailScreen from '@pages/ChangeEmail'
// Dependencies
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useLocation, Link, Outlet } from 'react-router-dom'

/* ==========================================================================
Routing Components
========================================================================== */

/**
 * @name MountTransition
 * Renders a framer-motion special div with animation capabilities
 * @constructor
 * @param {(element)} [props.children]  - An array of React.Elements to be rendered within the Route HOC.
 * @return {html}                       - A special div which executes the specified animation on render
 */
const MountTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: 'circInOut' }}
  >
    {children}
  </motion.div>
)

/**
 * @name AnimatedRoutes
 * Renders an Routes (switch in previous react-router versions) wrapped in framer-motions AnimatePresence HOC
 * @constructor
 * @param {boolean} [props.exitBeforeEnter] - Will only render one component at a time and when the exiting component will finish the entering component is being rendered
 * @param {(element)} [props.children]      - An array of React.Elements to be rendered within the Route HOC.
 * @param {boolean} [props.initial]         - Allow framer-motion to execute the animation on the first render
 * @return {html}                           - A wrapped Routes (switch) inside framer-motions AnimatePresence
 */
const AnimatedRoutes = ({
  exitBeforeEnter = true,
  initial = false,
  children,
}) => {
  const location = useLocation()
  return (
    <AnimatePresence exitBeforeEnter={exitBeforeEnter} initial={initial}>
      <Routes location={location} key={location.pathname}>
        {children}
      </Routes>
    </AnimatePresence>
  )
}

/**
 * @name RouteTransition
 * Renders an react-router Route component wrapped in MountTransition
 * @constructor
 * @param {object} [props]              - The properties object.
 * @param {(element)} [props.children]  - An array of React.Elements to be rendered within the Route HOC.
 * @param {boolean} [props.exact]       - Tells react-router if the route path in the url should exact match.
 * @param {(string)} [props.path]       - The path the route should link to.
 * @return {html}                       - The html <img /> tag.
 */
const RouteTransition = ({
  children,
  exact = false,
  path,
  slide = 0,
  slideUp = 0,
  ...rest
}) => (
  <Route
    exact={exact}
    path={path}
    {...rest}
    element={
      <MountTransition slide={slide} slideUp={slideUp}>
        {children}
      </MountTransition>
    }
  />
)

/* ==========================================================================
PropTypes
========================================================================== */

MountTransition.propTypes = {
  children: PropTypes.element,
}

AnimatedRoutes.propTypes = {
  exact: PropTypes.bool,
  path: PropTypes.string,
}

RouteTransition.propTypes = {
  exitBeforeEnter: PropTypes.bool,
  intial: PropTypes.bool,
}

/* ==========================================================================
App Routes
========================================================================== */

export const AppRoutes = () => {
  return (
    <AnimatedRoutes exitBeforeEnter initial={true}>
      <RouteTransition path="/categories" slide={50}>
        <CategoriesScreen />
      </RouteTransition>

      <RouteTransition path="/categories/:categoryId/articles" slide={50}>
        <ArticlesScreen />
      </RouteTransition>

      <Route path="profiel" element={<Outlet />}>
        <Route
          path="/"
          element={
            <MountTransition slide={50}>
              <ProfileScreen />
            </MountTransition>
          }
        />

        <Route
          path="verander-email"
          element={
            <MountTransition slide={50}>
              <ChangeEmailScreen />
            </MountTransition>
          }
        />
      </Route>

      <RouteTransition path="*" slide={30}>
        <>
          <p>Oops, deze pagina bestaat nog niet</p>
          <Link to="/categories">Ga naar categorieën</Link>
        </>
      </RouteTransition>
    </AnimatedRoutes>
  )
}
