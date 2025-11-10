#!/usr/bin/env python3
import os
import sys

port = os.environ.get('PORT', '8000')
os.execvp('uvicorn', ['uvicorn', 'backend.main:app', '--host', '0.0.0.0', '--port', port])
