<?php

namespace Drupal\alert\Plugin\Block;

use Drupal\Core\Block\BlockBase;

/**
 * Provides a 'Regular Alert' Block.
 *
 * @Block(
 *   id = "alert",
 *   admin_label = @Translation("Regular Alert"),
 *   category = @Translation("Alerts"),
 * )
 */
class AlertBlock extends BlockBase {

  /**
   * 
   * {@inheritdoc}
   */
  public function build() {
    return [
      '#markup' => $this->t('<!-- alert_block. Everything is JS. -->'),
      '#attached' => [
        'library' => ['alert/alert-js'],
      ],
    ];
  }

}