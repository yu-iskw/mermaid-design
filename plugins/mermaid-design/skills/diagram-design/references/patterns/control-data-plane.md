# Control Data Plane

## Use when

Distinguish policy/configuration from workload traffic.

## Semantic model

Control plane configures data plane; clients send workloads to data plane.

## Visual grammar

Prefer flowchart; resolve renderer capability before reading syntax.

## Preserve / avoid

Label edge meaning; do not route all traffic through the controller by accident.

## Removal test

Remove any element that does not explain the primary relationship. Split a second independent question into a separate figure.
