package de.sb85.eapp.server.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public abstract class ComponentBasics {

    protected final Logger logger = LoggerFactory.getLogger(this.getClass().getName());

    protected ComponentBasics() {
        logger.info(this.getClass().getName());
    }

}
