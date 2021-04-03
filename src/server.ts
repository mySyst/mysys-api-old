import './util/module-alias';
import { Server } from '@overnightjs/core';
import express, { Application } from 'express';
import { DemandsController } from './controllers/demads';

export class SetupServer extends Server {

  constructor(private port = 3000) {
    super();
  }

  public init(): void {
    this.SetupExpress();
    this.SetupControllers();
  }

  private SetupExpress(): void {
    this.app.use(express.json())
  }

  private SetupControllers(): void {
    const demandsController = new DemandsController;
    this.addControllers([demandsController])
  }

  public getApp(): Application {
    return this.app;
  }
}